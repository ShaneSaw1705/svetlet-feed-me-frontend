<script lang="ts">
	import type { Feed } from "$lib/models/feed";
	import { createQuery, useQueryClient } from "@tanstack/svelte-query"; // Import useQueryClient
	import { page } from "$app/stores"; // Import the page store to access URL parameters
	import { Loader2 } from "lucide-svelte";

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
</script>

<div>
	{#if $query.isLoading}
		<div class="w-screen h-screen flex items-center justify-center">
			<Loader2 class="animate-spin" />
		</div>
	{:else if $query.isError}
		<p>Error loading feed: {$query.error.message}</p>
	{:else if $query.data}
		<h1>Feed: {$query.data.Title}</h1>
		<p>Author: {$query.data.AuthorId}</p>
		<p>Secret: {$query.data.Secret}</p>
	{/if}
</div>
