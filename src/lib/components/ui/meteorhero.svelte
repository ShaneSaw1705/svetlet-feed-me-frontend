<script>
	import Meteor from "../meteor.svelte";

	import Button from "./button/button.svelte";
</script>

<div
	class="relative flex flex-col gap-4 h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl"
>
	<Meteor number={30} />
	<h1
		class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
	>
		Collect and Act on Customer Feedback
	</h1>
	<p
		class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
	>
		Improve your product with real-time insights from your users. Start your
		free trial today.
	</p>
	<div class="space-x-4">
		<Button size="lg">Get Started</Button>
		<Button variant="outline" size="lg">Learn More</Button>
	</div>
</div>
