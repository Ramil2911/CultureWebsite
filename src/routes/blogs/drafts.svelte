<script context="module">
	export const prerender = false;
</script>

<script>
	import { serverIps } from '../../models/ServerIps';
	import * as Session from '../../models/Session';

	import { onMount } from 'svelte';

	let drafts = [];

	$: isLoaded = false;

	onMount(async () => {
		var response = await fetch(serverIps[6] + '/drafts/get', {
			headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() })
		});
		console.log(Session.getToken());
		var json = await response.json();
		console.log(json);

		Object.assign(drafts, json);
		isLoaded = true;
	});
</script>

<div class="flex justify-center">
	<div class="max-w-[600px] bg-gray-100 rounded-xl py-4 px-4 flex-grow">
		{#if drafts.length == 0 && isLoaded}
		<p class="mb-2">Кажется, у вас нет черновиков? Давайте создадим новый!</p>
		{/if}
		<div class="inline-flex h-10 w-full">
			<input class="h-full flex-grow bg-gray-200 rounded-xl mr-2 px-2 outline-none" placeholder="Имя черновика"/>
			<button class="rounded-xl bg-blue-600 h-full px-2 text-white">
				Создать
			</button>
		</div>
		{#if !isLoaded}
		Загрузка...
		{/if}
		{#each drafts as draft}
		<p>{draft.title}</p>
		{/each}
	</div>
</div>

<style>
</style>
