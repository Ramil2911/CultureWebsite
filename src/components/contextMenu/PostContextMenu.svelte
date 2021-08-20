<script lang="ts">
	import { modal } from '../../models/Stores/ModalStore';
	import DeleteMovieModal from '../modals/DeleteMovieModal.svelte';
	import * as Session from '../../models/Session';
	import type { Post } from '../../models/Post';

	export let pos: { x: Number; y: Number } = { x: 0, y: 0 };
	export let post: Post;
</script>

<div style="position:absolute;top:{pos.y}px;left:{pos.x}px;">
	<div class="bg-[#253545]  flex flex-col text-left rounded-lg">
		<button class="px-2 pt-1 pb-0.5 rounded-t-lg hover:bg-[#304050] text-left ">
			Открыть "{post.title}"
		</button>
		<button
			class="px-2 py-0.5 {Session.getRole() == 'admin'
				? ''
				: 'pb-1 rounded-b-lg'} hover:bg-[#304050] text-left"
		>
			Добавить в Избранное
		</button>
		{#if Session.getRole() == 'admin'}
			<button class="px-2 py-0.5 hover:bg-[#304050] text-left"> Редактировать </button>
			<button
				class="px-2 pb-1 rounded-b-lg hover:bg-[#304050] text-left "
				on:click={() => {
					modal.set(DeleteMovieModal);
				}}
			>
				Удалить (!)
			</button>
		{/if}
	</div>
</div>
