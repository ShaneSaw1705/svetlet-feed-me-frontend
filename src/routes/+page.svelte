<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import * as Accordion from "$lib/components/ui/accordion";
	import { ChevronDown } from "lucide-svelte";
	import Retro from "$lib/components/retro.svelte";
	import Meteorhero from "$lib/components/ui/meteorhero.svelte";

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div class="bg-background text-foreground">
	<header
		class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	>
		<div class="container flex h-14 items-center">
			<div class="mr-4 hidden md:flex">
				<a class="mr-6 flex items-center space-x-2" href="/">
					<span class="hidden font-bold sm:inline-block">Feed Me</span
					>
				</a>
				<nav class="flex items-center space-x-6 text-sm font-medium">
					<a
						class="transition-colors hover:text-foreground/80 text-foreground/60"
						href="#features">Features</a
					>
					<a
						class="transition-colors hover:text-foreground/80 text-foreground/60"
						href="#pricing">Pricing</a
					>
					<a
						class="transition-colors hover:text-foreground/80 text-foreground/60"
						href="#faq">FAQ</a
					>
				</nav>
			</div>
			<Button class="ml-auto">Log In</Button>
			<button class="ml-2 md:hidden" on:click={toggleMenu}>
				<ChevronDown />
			</button>
		</div>
		{#if isMenuOpen}
			<nav class="md:hidden border-t">
				<a class="block px-4 py-2 hover:bg-accent" href="#features"
					>Features</a
				>
				<a class="block px-4 py-2 hover:bg-accent" href="#pricing"
					>Pricing</a
				>
				<a class="block px-4 py-2 hover:bg-accent" href="#faq">FAQ</a>
			</nav>
		{/if}
	</header>

	<main>
		<section class="py-12 md:py-24 lg:py-32 xl:py-48">
			<div class="container h-full w-full px-4 md:px-6">
				<div
					class="flex flex-col h-full w-full items-center space-y-4 text-center"
				>
					<div class="space-y-2 h-full w-full">
						<div
							class="relative flex flex-col h-full w-full items-center justify-center overflow-hidden border bg-background p-20 md:shadow-xl"
						>
							<span
								class="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
							>
								Feed Me
							</span>
							<Retro />
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="features" class="py-12 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<h2
					class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
				>
					Features
				</h2>
				<div class="grid gap-6 lg:grid-cols-3 lg:gap-12">
					<Card>
						<CardHeader>
							<CardTitle>Real-time Feedback</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Collect and analyze feedback as it comes in,
								allowing for quick responses and improvements.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Advanced Analytics</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Gain deep insights into customer sentiment with
								our powerful analytics tools.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Team Collaboration</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Work together seamlessly to address feedback and
								implement improvements.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>

		<section id="meteor" class="py-12 md:py-24 max-w-[60%] m-auto lg:py-32">
			<Meteorhero />
		</section>

		<section id="pricing" class="py-12 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<h2
					class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
				>
					Pricing Plans
				</h2>
				<div class="grid gap-6 lg:grid-cols-3 lg:gap-12">
					<Card>
						<CardHeader>
							<CardTitle>Starter</CardTitle>
							<CardDescription
								>Perfect for small teams</CardDescription
							>
						</CardHeader>
						<CardContent>
							<p class="text-3xl font-bold">$29/month</p>
							<ul class="mt-4 space-y-2">
								<li>Up to 1,000 responses/month</li>
								<li>Basic analytics</li>
								<li>Email support</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button class="w-full">Choose Plan</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Pro</CardTitle>
							<CardDescription
								>For growing businesses</CardDescription
							>
						</CardHeader>
						<CardContent>
							<p class="text-3xl font-bold">$99/month</p>
							<ul class="mt-4 space-y-2">
								<li>Up to 10,000 responses/month</li>
								<li>Advanced analytics</li>
								<li>Priority support</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button class="w-full">Choose Plan</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Enterprise</CardTitle>
							<CardDescription
								>For large organizations</CardDescription
							>
						</CardHeader>
						<CardContent>
							<p class="text-3xl font-bold">Custom</p>
							<ul class="mt-4 space-y-2">
								<li>Unlimited responses</li>
								<li>Custom analytics</li>
								<li>24/7 dedicated support</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button variant="outline" class="w-full"
								>Contact Sales</Button
							>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>

		<section id="faq" class="py-12 md:py-24 lg:py-32">
			<div class="container px-4 md:px-6">
				<h2
					class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
				>
					Frequently Asked Questions
				</h2>
				<Accordion.Root class="w-full" type="single" collapsible>
					<Accordion.Item value="item-1">
						<Accordion.Trigger
							>How does the free trial work?</Accordion.Trigger
						>
						<Accordion.Content>
							Our free trial gives you full access to all features
							for 14 days. No credit card required.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger
							>Can I change my plan later?</Accordion.Trigger
						>
						<Accordion.Content>
							Yes, you can upgrade or downgrade your plan at any
							time. Changes will be reflected in your next billing
							cycle.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger
							>What kind of support do you offer?</Accordion.Trigger
						>
						<Accordion.Content>
							We offer email support for all plans, with priority
							support for Pro plans and above. Enterprise plans
							include 24/7 dedicated support.
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</section>
	</main>

	<footer class="border-t py-6 md:py-0">
		<div
			class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"
		>
			<div
				class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0"
			>
				<p
					class="text-center text-sm leading-loose text-muted-foreground md:text-left"
				>
					© 2023 FeedbackPro. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>
