<script lang="ts">
	import type { Movie } from '../models/Movie';
	import MoviePanel from '../components/MoviePanel.svelte';
	import { serverIps } from '../models/ServerIps';

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

<div>
	<h2 class="text-4xl font-sans text-white mb-4">Фильмы</h2>
	<div class="flex gap-4">
		{#await popularMovies}
			<div class="flex rounded-lg bg-gray-700 h-80 w-48 text-white">
				<p class="text-lg">Waiting...</p>
			</div>
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
</div>
