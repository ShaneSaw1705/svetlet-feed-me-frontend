<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Card } from "$lib/components/ui/card";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { toast } from "svelte-sonner";
	import * as Select from "$lib/components/ui/select/index.js";
	import axios from "axios";
	import { blur } from "svelte/transition";
	import LoadingButton from "$lib/components/ui/button/loading-button.svelte";
	import {
		createMutation,
		createQuery,
		useQueryClient,
	} from "@tanstack/svelte-query";

	interface Feed {
		ID: number;
		AuthorId: string;
		Title: string;
		Secret: string;
	}

	interface Response {
		Feeds: Feed[];
	}

	let modal: boolean = false;
	let title: string = "";

	const qc = useQueryClient();

	const mutation = createMutation({
		mutationKey: ["feed"],
		mutationFn: createPost,
		onSuccess: () => {
			toast.success("Feed created successfully!");
			title = ""; // Reset title after successful creation
			modal = false; // Close modal
			qc.invalidateQueries({ queryKey: ["feeds"] });
		},
		onError: (error) => {
			console.error("Error creating feed:", error);
			toast.error("Failed to create feed. Please try again.");
		},
	});

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		$mutation.mutate({ title });
	};

	async function createPost(newPost: { title: string }) {
		try {
			const response = await axios.post("/api/feed/create", newPost);
			return response.data; // Return the response data
		} catch (err) {
			console.error(err);
			throw new Error(`${err}`);
		}
	}

	const fetchFeeds = createQuery<Response>({
		queryKey: ["feeds"],
		queryFn: async () => {
			try {
				const res = await axios.get("/api/feed/alluser");
				if (res.status === 200) {
					const feeds: Response = res.data; // Use direct assignment
					return feeds; // Ensure this is a valid Response
				}
				// If status is not 200, you can throw an error or return a default value
				throw new Error("Failed to fetch feeds");
			} catch (err) {
				console.error(err);
				throw new Error(String(err));
			}
		},
	});

	const handleModal = () => {
		modal = !modal;
	};
</script>

<div class="h-screen w-full grid-rows-[auto_1fr]">
	<div
		class="px-4 py-2 w-full flex flex-row border-b-2 justify-between items-center gap-2"
	>
		<Select.Root>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Feeds..." />
			</Select.Trigger>
			<Select.Content>
				{#if $fetchFeeds.isLoading}
					<div>Loading...</div>
				{:else if $fetchFeeds.isError}
					<div>Error loading feeds.</div>
				{:else if $fetchFeeds.data?.Feeds && $fetchFeeds.data.Feeds.length > 0}
					{#each $fetchFeeds.data.Feeds as feed}
						<Select.Item value={feed.Title}
							>{feed.Title}</Select.Item
						>
					{/each}
				{:else}
					<div>No feeds available.</div>
				{/if}
			</Select.Content>
		</Select.Root>

		<Button on:click={handleModal}>Create Feed</Button>
	</div>

	{#if modal}
		<div
			class="absolute flex w-screen h-screen items-center justify-center"
		>
			<div in:blur={{ duration: 300 }} out:blur={{ duration: 300 }}>
				<Card>
					<div class="w-full flex flex-row items-center justify-end">
						<Button
							on:click={handleModal}
							class="text-[14px] p-2 h-8 w-8"
							variant="ghost"
						>
							X
						</Button>
					</div>
					<CardHeader>
						<CardTitle>Create Feed</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							on:submit={handleSubmit}
							class="flex flex-col gap-2"
						>
							<Label>name</Label>
							<Input bind:value={title} type="text" required />
							<div class="w-full grid-cols-2">
								<LoadingButton
									variant="outline"
									loading={$mutation.isPending}
								>
									Create Feed
								</LoadingButton>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	{/if}
	<slot />
</div>
