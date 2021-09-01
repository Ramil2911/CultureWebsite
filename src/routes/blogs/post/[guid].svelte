<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { serverIps } from '../../../models/ServerIps';
	import * as Session from '../../../models/Session';
		import {uploader} from "../../../models/ImageUploader"

	$: record = undefined;
	let editor;
	$: author = undefined;
	$: ranked = 0; //0 is none, -1 is ranked down, 1 is ranked up
	$: rate = () => {
		return record ? record.rankUppers.length - record.rankDowners.length : 0;
	};

	onMount(async () => {
		var response = await fetch(serverIps[6] + '/blogs/' + $page.params.guid);
		var json = await response.json();

		if (json.rankUppers.includes(Session.getUserid())) ranked = 1;
		else if (json.rankDowners.includes(Session.getUserid())) ranked = -1;

		record = json;

		var userPromise = fetch(serverIps[0] + '/user/' + record.authorId);

		let EditorJS = (await import('@editorjs/editorjs')).default;
		let Header = (await import('@editorjs/header')).default;
		let List = (await import('@editorjs/list')).default;
		let Image = (await import('@editorjs/image')).default;

		if (record.bodyRaw == '') {
			editor = new EditorJS({
				tools: {
					header: {
						class: Header,
						inlineToolbar: true
					},
					list: {
						class: List,
						inlineToolbar: true
					},
					image: {
						class: Image,
						config: {
							uploader: uploader
						}
					}
				},
				readOnly: true,
				minHeight: 0
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
					},
					image: {
						class: Image,
						config: {
							uploader: uploader
						}
					}
				},
				readOnly: true,
				data: JSON.parse(record.bodyRaw),
				minHeight: 0
			});
		}

		var userResult = await userPromise;
		author = await userResult.json();
		console.log(ranked);
	});

	async function rankUp() {
		var old = ranked;
		ranked = 1;
		var res = await fetch(serverIps[6] + '/blogs/' + $page.params.guid + '/rankup', {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() }),
			method: "HEAD"
		});
		if (res.ok) {
			if (!record.rankUppers.includes(Session.getUserid()))
				record.rankUppers.push(Session.getUserid());
			ranked = 1;
			record.rankDowners.splice(record.rankDowners.indexOf(Session.getUserid()), 1);
			record = record;
		} else {
			ranked = old;
		}
	}
	async function rankDown() {
		var old = ranked;
		ranked = -1;
		var res = await fetch(serverIps[6] + '/blogs/' + $page.params.guid + '/rankdown', {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() }),
			method: "HEAD"
		});
		if (res.ok) {
			if (!record.rankDowners.includes(Session.getUserid()))
				record.rankDowners.push(Session.getUserid());
			ranked = -1;
			record.rankUppers.splice(record.rankUppers.indexOf(Session.getUserid()), 1);
			record = record;
		} else {
			ranked = old;
		}
	}
</script>

<div class="flex justify-center">
	<div class="max-w-[840px] shadow bg-white rounded-xl text-lg overflow-hidden flex-1">
		{#if author}
			<div class="h-[2rem] w-full inline-flex bg-gray-100 px-4 pt-1 items-center">
				<span>{author.username}</span>
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
			<div class="h-[2rem] w-full animate-pulse" />
		{/if}
		<div class="mx-4 mt-2 flex flex-col max-w-[720px]">
			<p class="text-3xl w-full outline-none">{record ? record.title : ''}</p>
			<div class="flex-grow flex-1 bordex-x-2 text-base" id="editorjs" />
		</div>
		<div class="w-full flex bg-gray-100 h-[2.5rem] px-3 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 flex-shrink-0 stroke-current text-gray-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
				/>
			</svg>
			<div class="flex-grow" />
			<div class="flex-shrink-0 inline-flex">
				<svg
					on:click={() => {
						rankDown();
					}}
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mt-1 mr-1 cursor-pointer stroke-current transition-colors {ranked == -1
						? 'text-red-500'
						: 'text-gray-600'}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
				{#if record}
					{record ? record.rankUppers.length - record.rankDowners.length : 0}
				{:else}
					...
				{/if}
				<svg
					on:click={() => {
						rankUp();
					}}
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mt-1 ml-1 cursor-pointer stroke-current text-gray-600 transition-colors {ranked ==
					1
						? 'text-green-500'
						: 'text-gray-600'}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				</svg>
			</div>
		</div>
	</div>
</div>
