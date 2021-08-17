<script lang="ts">
	import { onMount } from 'svelte';
	import editorjsHTML from 'editorjs-html';
	import { serverIps } from '../../../models/ServerIps';
	import { Post } from '../../../models/Post';
	import * as Session from '../../../models/Session';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	let editor;
	let draft: Post = new Post('', '', BigInt(0), '', '', '', '');
	let interval;

	onMount(async () => {
		const res = await fetch(serverIps[6] + '/drafts/get/' + $page.params.guid, {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() })
		});
		draft = await res.json();

		let EditorJS = (await import('@editorjs/editorjs')).default;
		let Header = (await import('@editorjs/header')).default;
		let List = (await import('@editorjs/list')).default;

		let editorParser = editorjsHTML();

		if (draft.bodyRaw == '') {
			editor = new EditorJS({
				tools: {
					header: {
						class: Header,
						inlineToolbar: true
					},
					list: {
						class: List,
						inlineToolbar: true
					}
				}
			});
		} else {
			editor = new EditorJS({
				tools: {
					header: {
						class: Header,
						inlineToolbar: true
					},
					list: {
						class: List,
						inlineToolbar: true
					}
				},
				data: JSON.parse(draft.bodyRaw)
			});
		}

		interval = window.setInterval(async function () {
			var contentRaw = await editor.save();
			var contentHtml = editorParser.parse(contentRaw);
			console.log(
				JSON.stringify({
					bodyRaw: JSON.stringify(contentRaw),
					bodyhtml: JSON.stringify(contentHtml),
					title: draft.title,
					note: ''
				})
			);
			const res = await fetch(serverIps[6] + '/drafts/update?guid=' + $page.params.guid, {
				headers: new Headers({
					Authorization: 'Bearer ' + Session.getToken(),
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({
					bodyRaw: JSON.stringify(contentRaw),
					bodyhtml: JSON.stringify(contentHtml),
					title: draft.title,
					note: ''
				}),
				method: 'POST'
			});
		}, 5000);
	});

	onDestroy(async () => {
		window.clearInterval(interval);
	});

	async function Upload() {
		editor.save().then((outputData) => {
			console.log(outputData);
		});
	}
</script>

<div class="flex justify-center">
	<div class="max-w-[900px] bg-white rounded-xl py-4 px-4 flex-grow">
		<input class="text-3xl w-full outline-none" bind:value={draft.title} />
		<div>
			<div class="max-w-[840px] flex-grow bordex-x-2" id="editorjs" />
		</div>
		<div>
			<button class="bg-blue-600 p-3 rounded-xl text-white" on:click={Upload}>
				<span>Опубликовать</span>
			</button>
			<span class="text-gray-500 pl-2">Текст сохраняется автоматически каждые 5 секунд</span>
		</div>
	</div>
</div>

<style>
</style>
