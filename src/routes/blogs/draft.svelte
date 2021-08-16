<script lang="ts">
	import { onMount } from 'svelte';
	import editorjsHTML from 'editorjs-html';

	let editor;

	onMount(async () => {
		let EditorJS = (await import('@editorjs/editorjs')).default;
		let Header = (await import('@editorjs/header')).default;
		let List = (await import('@editorjs/list')).default;

		let editorParser = editorjsHTML();

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

		window.setInterval(async function () {
			var contentRaw = await editor.save();
			var contentHtml = editorParser.parse(contentRaw);
			console.log(contentRaw);
			console.log(contentHtml);
		}, 5000);
	});

	async function Upload() {}
</script>

<div class="flex justify-center">
	<div class="max-w-[600px] bg-gray-100 rounded-xl py-4 px-4 flex-grow">
		<h2 class="text-3xl">Редактор черновиков</h2>
		<div class="flex justify-center">
			<div class="max-w-[720px] flex-grow bordex-x-2" id="editorjs" />
		</div>
		<button class="bg-green-500 p-3 rounded-xl text-white" on:click={Upload()}>
			<span>Опубликовать</span>
		</button>
	</div>
</div>

<style>
</style>
