<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { toast } from "svelte-sonner";
	function handleClick() {
		toast("yes!");
	}
</script>

<div class="flex w-screen h-screen items-center justify-center">
	<Button on:click={handleClick}>Testing</Button>
</div>
