<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { toast } from "svelte-sonner";

	function handleToast() {
		toast("testing", {
			action: {
				label: "testng",
				onClick: () => {
					toast("test1");
					toast("test2");
					toast("test3");
				},
			},
		});
	}
</script>

<div class="w-screen h-full flex flex-col items-center justify-center">
	<h1>Testing</h1>
	<Button on:click={handleToast}>Testing</Button>
</div>

