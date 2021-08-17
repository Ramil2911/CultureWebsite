<script lang="ts">
	import type { Post } from '../models/Post';
    import { serverIps } from '../models/ServerIps';
	import { goto } from '$app/navigation';
    import { menu, props } from '../models/Stores/ContextMenuStore';

	export let post: Post;

    //function openContextMenu(e) {
	//	menu.set(MovieContextMenu);
	//	props.set({ pos: { x: e.clientX, y: e.clientY }, movie: movie });
	//}
</script>

<div
	class="flex flex-col rounded-lg bg-gray-100 h-[20rem] w-40 cursor-pointer shadow-lg"
	on:click={()=>{goto('/blogs/post/' + post.guid)}}
	on:contextmenu|preventDefault={console.log}
>
	<div class="flex mx-1 flex-grow w-full">
		<div class="flex flex-col pl-2 pt-2 pr-2 pb-1">
			<p class="text-lg">{post.title}</p>
		</div>
	</div>
</div>
