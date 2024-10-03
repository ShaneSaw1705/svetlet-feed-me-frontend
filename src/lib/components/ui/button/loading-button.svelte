<script lang="ts">
	import { LoaderCircle } from "lucide-svelte";
	import Button from "./button.svelte";

	export let loading: boolean = false;
	export let variant:
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| undefined = "default";
</script>

<Button {variant} type="submit" disabled={loading}>
	{#if loading}
		<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
		Loading...
	{:else}
		<slot />
	{/if}
</Button>
