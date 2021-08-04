<script lang="ts">
	import type { Movie } from '../models/Movie';
	import MoviePanel from '../components/MoviePanel.svelte';
	import { serverIps } from '../models/ServerIps';
	import SkeletonPanel from '../components/SkeletonPanel.svelte';

	async function fetchPopularMovies(): Promise<Movie[]> {
		let movies: Movie[] = [];

		if (typeof process !== 'undefined') {
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		}
		var response = await fetch(serverIps[1] + '/movies/FetchMovies?lenght=5&skip=0');
		var json = await response.json();

		Object.assign(movies, json);
		return movies;
	}

	var popularMovies = fetchPopularMovies();
</script>

<div class="grid 2xl:grid-cols-2 gap-y-4 gap-x-1 text-white">
	<div>
		<p class="text-5xl mb-2">Фильмы</p>
		<div class="flex justify-start">
			<div class="h-[22rem] flex flex-wrap overflow-hidden gap-4 flex-initial">
				{#await popularMovies}
				<SkeletonPanel/>
				{:then result}
					{#each result as film}
						<MoviePanel movie={film} />
					{/each}
				{:catch error}
					<div class="flex rounded-lg bg-gray-700 h-80 w-48 text-white">
						<p class="text-lg">{error.stack}</p>
					</div>
				{/await}
			</div>
			<div class="hover:cursor-pointer w-[40px] h-[36px] bg-[#283848] text-center rounded-full self-center flex items-center justify-center">
				<span>></span>
			</div>
		</div>
	</div>
	<div>
		<p class="text-5xl mb-2">Сериалы</p>
		<div class="flex justify-start">
			<div class="h-[22rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#await popularMovies}
				<SkeletonPanel/>
				{:then result}
					{#each result as film}
						<MoviePanel movie={film} />
					{/each}
				{:catch error}
					<div class="flex rounded-lg bg-gray-700 h-80 w-48 text-white">
						<p class="text-lg">{error.stack}</p>
					</div>
				{/await}
			</div>
			<div class="hover:cursor-pointer w-[40px] h-[36px] bg-[#283848] text-center rounded-full self-center flex items-center justify-center">
				<span>></span>
			</div>
		</div>
	</div>
	<div>
		<p class="text-5xl mb-2">Книги</p>
		<div class="flex justify-start">
			<div class="h-[22rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#await popularMovies}
				<SkeletonPanel/>
				{:then result}
					{#each result as film}
						<MoviePanel movie={film} />
					{/each}
				{:catch error}
					<div class="flex rounded-lg bg-gray-700 h-80 w-48 text-white">
						<p class="text-lg">{error.stack}</p>
					</div>
				{/await}
			</div>
			<div class="hover:cursor-pointer w-[40px] h-[36px] bg-[#283848] text-center rounded-full self-center flex items-center justify-center">
				<span>></span>
			</div>
		</div>
	</div>
	<div>
		<p class="text-5xl mb-2">Персонажи</p>
		<div class="flex justify-start">
			<div class="h-[22rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#await popularMovies}
				<SkeletonPanel/>
				{:then result}
					{#each result as film}
						<MoviePanel movie={film} />
					{/each}
				{:catch error}
					<div class="flex rounded-lg bg-gray-700 h-80 w-48 text-white">
						<p class="text-lg">{error.stack}</p>
					</div>
				{/await}
			</div>
			<div class="hover:cursor-pointer w-[40px] h-[36px] bg-[#283848] text-center rounded-full self-center flex items-center justify-center">
				<span>></span>
			</div>
		</div>
	</div>
	<div class="2xl:order-last">
		<p class="text-5xl mb-2">Люди</p>
		<div class="flex justify-start">
			<div class="h-[22rem] flex flex-wrap overflow-hidden gap-4 flex-grow-0">
				{#await popularMovies}
				<SkeletonPanel/>
				{:then result}
					{#each result as film}
						<MoviePanel movie={film} />
					{/each}
				{:catch error}
					<div class="flex rounded-lg bg-gray-700 h-80 w-48 text-white">
						<p class="text-lg">{error.stack}</p>
					</div>
				{/await}
			</div>
			<div class="hover:cursor-pointer w-[40px] h-[36px] bg-[#283848] text-center rounded-full self-center flex items-center justify-center">
				<span>></span>
			</div>
		</div>
	</div>
	<div>
		НОВОСТИ
	</div>
</div>
