<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { Post } from '../../../models/Post';
	import type { User } from '../../../models/User';
	import { serverIps } from '../../../models/ServerIps';

	let record: Post = new Post('', '', BigInt(0), '', '', '', '');
	let editor;
	$: author = undefined;

	onMount(async () => {
		var response = await fetch(serverIps[6] + '/blogs/' + $page.params.guid);
		record = await response.json();
		var userPromise = fetch(serverIps[0] + '/user/' + record.authorId);

		let EditorJS = (await import('@editorjs/editorjs')).default;

		if (record.bodyRaw == '') {
			editor = new EditorJS({
				readOnly: true,
				minHeight: 0
			});
		} else {
			editor = new EditorJS({
				readOnly: true,
				data: JSON.parse(record.bodyRaw),
				minHeight: 0
			});
		}

		var userResult = await userPromise;
		author = await userResult.json();
	});
</script>

<div class="flex justify-center">
	<div class="max-w-[840px] shadow bg-white rounded-xl text-lg overflow-hidden">
		{#if author}
			<div class="h-[2rem] w-full inline-flex bg-gray-100 px-4 pt-1 items-center">
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
			<div class="h-[3rem] w-full animate-pulse" />
		{/if}
		<div class="mx-4 mt-2">
			<p class="text-3xl w-full outline-none">{record.title}</p>
			<div>
				<div class="max-w-[840px] flex-grow bordex-x-2" id="editorjs" />
			</div>
		</div>
		<div class="w-full flex bg-gray-100 h-[2.5rem] px-3 items-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
			</svg>
			<div class="flex-grow"/>
			<div class="flex-shrink-0 inline-flex">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1 mr-1  stroke-current text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
				100
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-1 ml-1  stroke-current text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				</svg>
			</div>
		</div>
	</div>
</div>
