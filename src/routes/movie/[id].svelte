<script lang="ts" context="module">
	import type { Movie } from '../../models/Movie';
	import { serverIps } from '../../models/ServerIps';
	import { Genre } from '../../models/Genres';

	export async function load({ page, fetch, session, context }) {
		const res = await fetch(serverIps[1] + '/movies/FetchMovie?id=' + page.params.id);
		if (res.ok) {
			return {
				props: {
					movie: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${page.params.id}`)
		};
	}
</script>

<script lang="ts">
	export let movie: Movie;
</script>

<div class="flex flex-col lg:flex-row gap-4 min-h-[60rem] w-full justify-center">
	<div class="w-[22rem] flex flex-col items-center flex-none h-[100%]">
		<div class="rounded-lg w-4/5 aspect-w-4 aspect-h-5">
			<img
				class="rounded-lg overflow-hidden"
				src="{serverIps[4]}/image/{movie.posterId}"
				alt="Poster of {movie.name}"
			/>
		</div>
	</div>
	<div class="col-start-2 col-end-5 min-w-[40rem] flex flex-col gap-4 divide-[#405060] ">
		<h1 class="font-sans text-5xl">{movie.name}</h1>
		<hr class="bg-[#152535] h-[0.1rem]" />
		<div class="w-full flex items-center">
			<p class="w-[15%] text-sm">Оригинальное название</p>
			<p class="flex-grow">{movie.originalName}</p>
		</div>
		<div class="w-full flex">
			<p class="w-[15%] text-sm">Жанры</p>
			<p class="flex-grow">
				{#each movie.genres as genre}
					{Genre[genre]}
				{/each}
			</p>
		</div>
		<div class="w-full flex">
			<p class="w-[15%] text-sm">Год выпуска</p>
			<p class="flex-grow">{movie.year}</p>
		</div>
		<div class="w-full flex">
			<p class="w-[15%] text-sm">Страна</p>
			<p class="flex-grow">{movie.country}</p>
		</div>
		<div class="w-full flex">
			<p class="w-[15%] text-sm">Возрастной рейтинг</p>
			<p class="flex-grow">{movie.minimalAge}+</p>
		</div>
		<p class="flex-grow w-[50%]">{movie.description}</p>
	</div>
</div>
