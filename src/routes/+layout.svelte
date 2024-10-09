<script lang="ts">
	import "../app.css";
	import { Toaster } from "$lib/components/ui/sonner";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

	const qc = new QueryClient();
</script>

<html lang="en" class="" />

<Toaster />
<QueryClientProvider client={qc}>
	<slot />
</QueryClientProvider>
