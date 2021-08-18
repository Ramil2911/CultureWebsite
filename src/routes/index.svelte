<script lang="ts">
	import type { Movie } from '../models/Movie';
	import type { Post } from '../models/Post';
	import MoviePanel from '../components/MoviePanel.svelte';
	import PostPanel from '../components/PostPanel.svelte';
	import { serverIps } from '../models/ServerIps';
	import SkeletonPanel from '../components/SkeletonPanel.svelte';
	import { onMount } from 'svelte';

	$: movies = [];
	$: popularPosts = [];
	$: latestPosts = [];

	async function fetchPopularMovies(): Promise<Movie[]> {
		if (typeof process !== 'undefined') {
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		}
		var response = await fetch(serverIps[1] + '/movies/FetchMovies?lenght=5&skip=0');
		var json = await response.json();

		movies = json;
		return movies;
	}

	async function fetchPopularPosts() {
		return await fetchLatestPosts(); //TODO: popular
	}

	async function fetchLatestPosts() {
		if (typeof process !== 'undefined') {
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		}
		var response = await fetch(serverIps[6] + '/blogs/latest?amount=3&skip=0');
		var json = await response.json();
		console.log(json)
		return json;
	}

	onMount(async () => {
		movies = await fetchPopularMovies();
		popularPosts = await fetchPopularPosts();
	});
</script>

<div class="grid 2xl:grid-cols-2 gap-y-2 gap-x-1 ">
	<div>
		<div class="inline-flex w-full">
			<span class="text-5xl mb-2">Фильмы</span>
			<div class="flex-grow" />
			<div class="inline-flex mr-4 cursor-pointer">
				<span class="text-lg mt-4">Больше</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mt-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 7l5 5m0 0l-5 5m5-5H6"
					/>
				</svg>
			</div>
		</div>
		<div class="flex justify-start">
			<div class="h-[21rem] flex flex-wrap overflow-hidden gap-4 flex-initial">
				{#if movies.length == 0}
					{#each Array(5) as _}
						<SkeletonPanel />
					{/each}
				{:else}
					{#each movies as film}
						<MoviePanel movie={film} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div>
		<div class="inline-flex w-full">
			<span class="text-5xl mb-2">Сериалы</span>
			<div class="flex-grow" />
			<div class="inline-flex mr-4 cursor-pointer">
				<span class="text-lg mt-4">Больше</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mt-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 7l5 5m0 0l-5 5m5-5H6"
					/>
				</svg>
			</div>
		</div>
		<div class="flex justify-start">
			<div class="h-[21rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#if movies.length == 0}
					{#each Array(5) as _}
						<SkeletonPanel />
					{/each}
				{:else}
					{#each movies as film}
						<MoviePanel movie={film} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div>
		<div class="inline-flex w-full">
			<span class="text-5xl mb-2">Книги</span>
			<div class="flex-grow" />
			<div class="inline-flex mr-4 cursor-pointer">
				<span class="text-lg mt-4">Больше</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mt-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 7l5 5m0 0l-5 5m5-5H6"
					/>
				</svg>
			</div>
		</div>
		<div class="flex justify-start">
			<div class="h-[21rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#if movies.length == 0}
					{#each Array(5) as _}
						<SkeletonPanel />
					{/each}
				{:else}
					{#each movies as film}
						<MoviePanel movie={film} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div>
		<div class="inline-flex w-full">
			<span class="text-5xl mb-2">Персонажи</span>
			<div class="flex-grow" />
			<div class="inline-flex mr-4 cursor-pointer">
				<span class="text-lg mt-4">Больше</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mt-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 7l5 5m0 0l-5 5m5-5H6"
					/>
				</svg>
			</div>
		</div>
		<div class="flex justify-start">
			<div class="h-[21rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#if movies.length == 0}
					{#each Array(5) as _}
						<SkeletonPanel />
					{/each}
				{:else}
					{#each movies as film}
						<MoviePanel movie={film} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
<div class="flex flex-col items-center">
	НОВОСТи
	{#each popularPosts as post}
		<PostPanel post={post}/>
	{/each}
	<div class="inline-flex bg-white rounded-xl p-2 shadow">
		<span class="text-center text-lg w-full">Больше</span>
		<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 mt-1"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 7l5 5m0 0l-5 5m5-5H6"
		/>
	</svg>
	</div>
</div>
