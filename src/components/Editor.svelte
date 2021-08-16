<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		let EditorJS = (await import('@editorjs/editorjs')).default;
		let Header = (await import('@editorjs/header')).Header;
		let List = (await import('@editorjs/list')).List;

		const editor = new EditorJS({
			holder: 'editorjs',
			tools: {
				header: {
					class: Header,
					inlineToolbar: ['link']
				},
				list: {
					class: List,
					inlineToolbar: true
				}
			},
			onReady: () => {
				console.log(` Editor.js is ready to work!`);
			}
		});
	});
</script>

<div id="editorjs" />
