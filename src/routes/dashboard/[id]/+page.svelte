<script lang="ts">
	import type { Feed } from "$lib/models/feed";
	import {
		createQuery,
		useQueryClient,
		createMutation,
	} from "@tanstack/svelte-query"; // Import useQueryClient
	import { page } from "$app/stores"; // Import the page store to access URL parameters
	import { Loader2 } from "lucide-svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import axios from "axios";
	import { toast } from "svelte-sonner";
	import Card from "$lib/components/ui/card/card.svelte";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";

	let id: string | undefined;

	const queryClient = useQueryClient(); // Get the query client

	// Reactive declaration to update the id
	$: {
		const newId = $page.params.id;
		if (newId !== id) {
			id = newId; // Update id
			queryClient.invalidateQueries({ queryKey: ["feed"] }); // Invalidate the query when id changes
		}
	}

	const query = createQuery({
		queryKey: ["feed", id], // Use id from queryKey
		queryFn: async (): Promise<Feed> => {
			if (!id) {
				throw new Error("ID is required"); // Throw an error if id is not available
			}
			const res = await fetch(`/api/feed/byid/${id}`);
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data: Feed = await res.json(); // Parse the response object
			return data;
		},
	});

	const mutation = createMutation({
		mutationKey: ["feeds"],
		mutationFn: async () => {
			try {
				await axios.delete(`/api/feed/byid/${id}`);
			} catch (err) {
				throw new Error(`${err}`);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds"] });
			toast.success("feed removed successfully!");
		},
	});

	function handleDelete() {
		$mutation.mutate();
	}
</script>

<div>
	{#if $query.isLoading}
		<div class="w-screen h-screen flex items-center justify-center">
			<Loader2 class="animate-spin" />
		</div>
	{:else if $query.isError}
		<p>Error loading feed: {$query.error.message}</p>
	{:else if $query.data}
		<div class="w-screen h-[80vh] flex items-center justify-center">
			<!-- test card -->
			<Card>
				<CardHeader>
					<CardTitle>{$query.data.Title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Author: {$query.data.AuthorId}</p>
					<p>Secret: {$query.data.Secret}</p>
					<Button on:click={handleDelete} variant="destructive">
						{#if $mutation.isPending}
							<Loader2 class="animate-spin" />
						{:else}
							Delete
						{/if}
					</Button>
				</CardContent>
			</Card>
		</div>
	{/if}
</div>
