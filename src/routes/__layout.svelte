<script lang="ts">
	import '../app.postcss';
	import { serverIps } from '../models/ServerIps';
	import { goto } from '$app/navigation';
	import jwt_decode from 'jwt-decode';
	import { menu } from '../models/Stores/ContextMenuStore';
	import ContextMenu from '../components/contextMenu/ContextMenu.svelte';
	import {SessionStore} from "../models/Stores/SessionStore"
	import {modal, props} from "../models/Stores/ModalStore"

	$: isRegister = false;
	$: authOpened = false;
	$: isAuthorized = $SessionStore.isAuthorized;

	$: login = '';
	$: email = '';
	$: password = '';

	async function Login() {
		if (login == '' || password == '') {
			throw new Error();
		}
		var response = await fetch(
			serverIps[0] + '/Login?username=' + login + '&password=' + password,
			{ method: 'POST' }
		);
		if (response.ok) {
			var result = await response.json();
			$SessionStore.username = result.username;
			$SessionStore.token = result.access_token;
			$SessionStore.isAuthorized = true;
			$SessionStore.role = jwt_decode(result.access_token)[
				'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
			];
		}
	}
</script>

<div
	class="min-h-screen bg-[#102030]"
	on:click={() => {
		menu.set(undefined);
		modal.set(undefined)
	}}
>
	<div class="flex-1 flex flex-col h-14 bg-gray-900 text-white">
		<nav class="flex justify-between h-16 border-b-2 border-none">
			<ul class="flex items-center">
				<li class="h-6 px-4">Blabla</li>
			</ul>

			<ul class="flex flex-grow items-center h-full ml-2">
				<li class="px-2 py-2 hover:bg-gray-700 rounded-lg cursor-pointer">
					<span> Кино </span>
				</li>
				<li class="px-2 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
					<span> Сериалы </span>
				</li>
				<li class="px-2 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
					<span> Книги </span>
				</li>
				<li class="px-2 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
					<span> Люди </span>
				</li>
				<li class="px-2 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
					<span> Персонажи </span>
				</li>
				{#if $SessionStore.role == 'admin'}
					<li
						class="px-2 py-2 hover:bg-gray-800 rounded-lg cursor-pointer"
						on:click={() => goto('/admin')}
					>
						<span> Администратирование </span>
					</li>
				{/if}
			</ul>

			<ul class="flex-grow" />

			<ul class="flex items-center mr-4">
				{#if isAuthorized}
					<button class="p-2 bg-gray-800 rounded-lg">{$SessionStore.username}</button>
				{:else}
					<button
						class="p-2 bg-gray-800 rounded-lg"
						on:click={() => {
							authOpened = !authOpened;
						}}>Авторизация</button
					>
				{/if}
			</ul>
		</nav>
	</div>
	<div class="py-8 px-16">
		<slot />
	</div>
</div>

{#if authOpened && !isAuthorized}
	<div class="absolute top-14 right-0 bg-[#223242] rounded-lg p-4">
		<div class="mx-2 flex flex-col text-white align-start items-center">
			<div class="flex divide-x-2 pb-4">
				{#if isRegister}
					<p
						class="text-xl px-2 cursor-pointer"
						on:click={() => {
							isRegister = false;
						}}
					>
						Вход
					</p>
					<p class="text-xl px-2 underline cursor-default">Регистрация</p>
				{:else}
					<p class="text-xl px-2 underline cursor-default">Вход</p>
					<p
						class="text-xl px-2 cursor-pointer"
						on:click={() => {
							isRegister = true;
						}}
					>
						Регистрация
					</p>
				{/if}
			</div>
			{#if isRegister}
				<p class="place-self-start text-lg ml-3">Логин</p>
				<input
					bind:value={login}
					class="rounded w-64 h-[2.5rem] bg-[#283848] outline-none px-2 mb-4 mt-1"
				/>
				<p class="place-self-start text-lg ml-3">Почта</p>
				<input
					bind:value={email}
					class="rounded w-64 h-[2.5rem] bg-[#283848] outline-none px-2 mb-4 mt-1"
				/>
				<p class="place-self-start text-lg ml-3">Пароль</p>
				<input
					bind:value={password}
					class="rounded w-64 h-[2.5rem] bg-[#283848] outline-none px-2 mb-6 mt-1"
				/>
				<button class="p-2 rounded-lg bg-[#1a2a3a]">
					<p>Регистрация</p>
				</button>
			{:else}
				<p class="place-self-start text-lg ml-3">Логин</p>
				<input
					bind:value={login}
					class="rounded w-64 h-[2.5rem] bg-[#283848] outline-none px-2 mb-4 mt-1"
				/>
				<p class="place-self-start text-lg ml-3">Пароль</p>
				<input
					bind:value={password}
					class="rounded w-64 h-[2.5rem] bg-[#283848] outline-none px-2 mb-6 mt-1"
				/>
				<div class="grid grid-cols-2 gap-2">
					<button class="p-2 rounded-lg bg-[#1a2a3a]">
						<p>Забыли пароль?</p>
					</button>
					<button on:click={Login} class="p-2 rounded-lg bg-[#1a2a3a]">
						<p>Войти</p>
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<ContextMenu />

{#if $modal != null}
<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<svelte:component this="{$modal}" {...$props}/>
</div>
{/if}