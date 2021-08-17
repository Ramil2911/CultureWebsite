<script lang="ts">
	import type { Movie } from '../models/Movie';
	import { serverIps } from '../models/ServerIps';
	import { Genre } from '../models/Genres';
	import { goto } from '$app/navigation';
	import MovieContextMenu from './contextMenu/MovieContextMenu.svelte';
	import { menu, props } from '../models/Stores/ContextMenuStore';

	export let movie: Movie;

	function openContextMenu(e) {
		menu.set(MovieContextMenu);
		props.set({ pos: { x: e.clientX, y: e.clientY }, movie: movie });
	}

	function getRandomColor() {
		var color = 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
		return color;
	}
</script>

<div
	class="flex flex-col rounded-lg bg-gray-100 h-[20rem] w-40 cursor-pointer shadow-lg"
	on:click={()=>{goto('/movie/' + movie.id)}}
	on:contextmenu|preventDefault={openContextMenu}
>
	<img
		class="h-[68%] rounded-t-lg"
		src="{serverIps[4]}/image/{movie.posterId}"
		alt="Poster of {movie.name}"
	/>
	<div class="flex mx-1 flex-grow w-full">
		<div class="flex flex-col pl-2 pt-2 pr-2 pb-1">
			<p class="text-lg">{movie.name}</p>
			<p>{movie.originalName}</p>
			<div class="flex flex-wrap flex-grow gap-1 h-[2.5rem] overflow-hidden">
				{#each movie.genres as genre}
					<div class="text-xs rounded-lg px-1" style="background-color: {getRandomColor()};">
						{Genre[genre]}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
