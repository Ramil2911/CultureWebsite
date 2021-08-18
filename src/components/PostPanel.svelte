<script lang="ts">
	import type { Post } from '../models/Post';
    import { serverIps } from '../models/ServerIps';
	import { goto } from '$app/navigation';
    import { menu, props } from '../models/Stores/ContextMenuStore';
	import { onMount } from 'svelte';

	export let post: Post;

	let editor;
	$: author = undefined;

	onMount(async () => {

		var userPromise = fetch(serverIps[0] + '/user/' + post.authorId);

		let EditorJS = (await import('@editorjs/editorjs')).default;

		var body = JSON.parse(post.bodyRaw);
		body.blocks = [body.blocks[0]]

		if (post.bodyRaw == '') {
			editor = new EditorJS({
				readOnly: true,
				holderId: "editorjs-"+post.guid,
				minHeight: 0
			});
		} else {
			editor = new EditorJS({
				readOnly: true,
				data: body,
				holderId: "editorjs-"+post.guid,
				minHeight: 0
			});
		}

		var userResult = await userPromise;
		author = await userResult.json();
	});

    //function openContextMenu(e) {
	//	menu.set(MovieContextMenu);
	//	props.set({ pos: { x: e.clientX, y: e.clientY }, movie: movie });
	//}
</script>

<div class="max-w-[700px] shadow bg-white rounded-xl pb-4 flex-grow text-lg overflow-hidden mb-4"
		on:contextmenu|preventDefault={console.log}>
	{#if author}
		<div class="h-[2.5rem] w-full inline-flex bg-gray-100 px-4 pt-1 items-center">
			<span>{author.login}</span>
			{#if author.role == 'admin'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mx-1 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
					/>
				</svg>
			{/if}
		</div>
	{:else}
		<div class="h-[2.5rem] w-full animate-pulse" />
	{/if}
	<div class="mx-4 mt-2 cursor-pointer"
	on:click={()=>{goto('/blogs/post/' + post.guid)}}>
		<p class="text-2xl w-full outline-none">{post.title}</p>
		<div>
			<div class="max-w-[700px] flex-grow bordex-x-2 text-base" id="editorjs-{post.guid}" />
		</div>
	</div>
</div>