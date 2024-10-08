<script lang="ts">
	import { page } from "$app/stores"; // Import the page store
	import type { Feed } from "$lib/models/feed";
	import { onMount } from "svelte";

	$: id = $page.params.id;

	let feed: Feed;

	onMount(async () => {
		const res = await fetch(`/api/feed/byid/${id}`);
		const data = await res.json(); // Parse the full response object
		feed = data.feed; // Access the 'feed' property
	});
</script>

<!-- Display the feed information -->
<div>
	{#if feed}
		<h1>Feed: {feed.Title}</h1>
		<p>Author: {feed.AuthorId}</p>
		<p>Secret: {feed.Secret}</p>
	{/if}
</div>
