<script lang="ts">
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { toast } from "svelte-sonner";
	import axios from "axios";
	import LoadingButton from "$lib/components/ui/button/loading-button.svelte";

	let email: string = "";
	let loading: boolean = false;

	function handleSubmit(e: Event) {
		e.preventDefault();
		signInEmail();
	}

	async function signInEmail() {
		loading = true;
		try {
			const response = await axios.post("/api/auth", { email });
			toast.success(response.data.message); // Display success message
		} catch (error) {
			console.error(error);
			toast.error("Failed to sign in."); // Display error message
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex w-screen h-screen justify-center items-center">
	<Card>
		<CardHeader>
			<CardTitle>Login</CardTitle>
		</CardHeader>
		<CardContent>
			<form on:submit={handleSubmit}>
				<Label>Email</Label>
				<Input type="email" bind:value={email} required />
				<LoadingButton variant="default" {loading}>
					log in
				</LoadingButton>
			</form>
		</CardContent>
	</Card>
</div>
