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
	import { createMutation } from "@tanstack/svelte-query";

	let modal: boolean = false;
	let title: string = "";

	const mutation = createMutation({
		mutationKey: ["feed"],
		mutationFn: createPost,
		onSuccess: () => {
			toast.success("Feed created successfully!");
			title = ""; // Reset title after successful creation
			modal = false; // Close modal
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

	const feeds = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" },
	];

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
				{#each feeds as feed}
					<Select.Item value={feed.value}>{feed.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		<Button on:click={handleModal}>create feed</Button>
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
						<CardTitle>Create feed</CardTitle>
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
									create feed
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
