<script lang="ts">
	import type { Movie } from '../../models/Movie';
	import { modal, props as modalProps } from '../../models/Stores/ModalStore';
	import { menu, props as menuProps } from '../../models/Stores/ContextMenuStore';
	import DeleteMovieModal from '../modals/DeleteMovieModal.svelte';
	import * as Session from '../../models/Session';

	export let pos: { x: Number; y: Number } = { x: 0, y: 0 };
	export let movie: Movie;

	let offsetX;
	let offsetY;
</script>

<svelte:window bind:scrollX={offsetX} bind:scrollY={offsetY} />

<div style="position:absolute;top:{pos.y}px;left:{pos.x}px;">
	<div class="bg-white  flex flex-col text-left rounded-lg shadow-xl">
		<button class="px-2 pt-1 pb-0.5 rounded-t-lg hover:bg-gray-100 text-left ">
			Открыть "{movie.name}"
		</button>
		<button
			class="px-2 py-0.5 {Session.getRole() == 'admin'
				? ''
				: 'pb-1 rounded-b-lg'} hover:bg-gray-100 text-left"
		>
			Добавить в Избранное
		</button>
		{#if Session.getRole() == 'admin'}
			<button class="px-2 py-0.5 hover:bg-gray-100 text-left"> Редактировать </button>
			<button
				class="px-2 pb-1 rounded-b-lg hover:bg-gray-100 text-left "
				on:click={() => {
					modal.set(DeleteMovieModal);
					modalProps.set({ movie: movie });
					menu.set(null);
					menuProps.set(null);
				}}
			>
				Удалить (!)
			</button>
		{/if}
	</div>
</div>
