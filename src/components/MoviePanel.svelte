<script lang="ts">
	import type { Movie } from '../models/Movie';
	import { serverIps } from '../models/ServerIps';
	import { Genre } from '../models/Genres';
	import { ContextMenus } from "../models/ContextMenus"
	import { goto } from '$app/navigation';
	import MovieContextMenu from './contextMenu/MovieContextMenu.svelte';

	export let movie: Movie;


	function open() {
		goto('/movie/' + movie.id);
	}
	function openContextMenu(e) {
		ContextMenus.currentProps = [];
		ContextMenus.currentProps.push({pos:{x:e.clientX, y:e.clientY}})
		ContextMenus.currentMenu = MovieContextMenu;
	}

</script>

<div
	class="flex flex-col rounded-lg bg-[#203040] h-[22rem] w-48 text-white cursor-pointer"
	on:click={open}
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
			<div class="flex content-center flex-wrap flex-grow gap-1">
				{#each movie.genres as genre}
					<div class="text-xs rounded-lg bg-red-900 px-1">
						{Genre[genre]}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>