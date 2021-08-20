<script lang="ts">
	import type { Movie } from '../models/Movie';
	import type { Post } from '../models/Post';
	import MoviePanel from '../components/MoviePanel.svelte';
	import PostPanel from '../components/PostPanel.svelte';
	import { serverIps } from '../models/ServerIps';
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';

	$: popularPosts = [];
	$: latestPosts = [];

	let modeSort = ['Популярное', 'Свежее'];
	$: chosenSort = modeSort[0];
	let modeSource = ['Все', 'От редакции'];
	$: chosenSource = modeSource[0];

	async function fetchPopularPosts() {
		return await fetchLatestPosts(); //TODO: popular
	}

	async function fetchLatestPosts() {
		if (typeof process !== 'undefined') {
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		}
		var response = await fetch(serverIps[6] + '/blogs/latest?amount=3&skip=0');
		var json = await response.json();
		console.log(json);
		return json;
	}

	onMount(async () => {
		popularPosts = await fetchPopularPosts();
	});
</script>

<div class="flex flex-col items-center">
	<div class="inline-flex gap-2">
		<div class="inline-flex rounded-lg shadow overflow-hidden h-[1.7rem] bg-gray-100 mb-2">
			{#each modeSort as modeName, i}
				<button
					class="h-full rounded-lg px-1 {modeName == chosenSort
						? 'bg-blue-600 text-white'
						: 'bg-gray-100'}"
					on:click={() => {
						chosenSort = modeSort[i];
					}}
				>
					{modeName}
				</button>
			{/each}
		</div>
		<div class="inline-flex rounded-lg shadow overflow-hidden h-[1.7rem] bg-gray-100 mb-2">
			{#each modeSource as modeName, i}
				<button
					class="h-full rounded-lg px-1 {modeName == chosenSource
						? 'bg-blue-600 text-white'
						: 'bg-gray-100'}"
					on:click={() => {
						chosenSource = modeSource[i];
					}}
				>
					{modeName}
				</button>
			{/each}
		</div>
	</div>
	{#each popularPosts as post}
		<PostPanel {post} />
	{/each}
</div>
