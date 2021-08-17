<script context="module">
	export const prerender = false;
</script>

<script>
	import { serverIps } from '../../models/ServerIps';
	import * as Session from '../../models/Session';
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';

	$: drafts = [];

	$: isLoaded = false;

	$: nameField = '';

	onMount(async () => {
		var response = await fetch(serverIps[6] + '/drafts/get', {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() })
		});
		console.log(Session.getToken());
		var json = await response.json();
		console.log(json);

		isLoaded = true;
		drafts = json;
	});

	const Create = async () => {
		var res = await fetch(serverIps[6] + '/drafts/add?title=' + nameField, {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() }),
			method: 'POST'
		});
		var guid = (await res.json()).guid;
		goto('/blogs/draft/' + guid);
	};

	const Delete = async (guid) => {
		await fetch(serverIps[6] + '/drafts/delete?guid=' + guid, {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() }),
			method: 'DELETE'
		});

		var response = await fetch(serverIps[6] + '/drafts/get', {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() })
		});
		var json = await response.json();

		drafts = json;
	};
</script>

<div class="flex justify-center">
	<div class="max-w-[600px] bg-gray-100 rounded-xl flex-grow overflow-hidden shadow-xl">
		{#if drafts.length == 0 && isLoaded}
			<p class="mt-4 mx-4">Кажется, у вас нет черновиков? Давайте создадим новый!</p>
		{/if}
		<div class="inline-flex h-14 w-full pt-4 px-4">
			<input
				class="h-full flex-grow bg-gray-200 rounded-xl mr-2 px-2 outline-none"
				placeholder="Имя черновика"
				bind:value={nameField}
			/>
			<button
				on:click={Create}
				class="rounded-xl bg-blue-600 h-full px-2 text-white hover:scale-105 transition-transform"
			>
				Создать
			</button>
		</div>
		<div class="h-4" />
		{#if !isLoaded}
			Загрузка...
		{/if}
		{#each drafts as draft, i}
			<div
				class="{i % 2 == 0
					? 'bg-gray-200'
					: 'bg-gray-100'} flex items-center px-4 group cursor-pointer"
			>
				<p class="py-2 flex-grow" on:click={() => goto('/blogs/draft/' + draft.guid)}>
					{i + 1}. {draft.title}
				</p>
				<svg
					on:click={() => {
						Delete(draft.guid);
					}}
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-none stroke-current {i % 2 == 0
						? 'text-gray-200'
						: 'text-gray-100'} group-hover:text-gray-500 hover:!text-red-500 hover:!scale-110 transition-colors transition-transform duration-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</div>
		{/each}
	</div>
</div>
