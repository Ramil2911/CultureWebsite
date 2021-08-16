<script lang="ts">
  	import "../app.postcss";

	import { serverIps } from '../models/ServerIps';
	import { goto } from '$app/navigation';
	import jwt_decode from 'jwt-decode';
	import { menu } from '../models/Stores/ContextMenuStore';
	import ContextMenu from '../components/contextMenu/ContextMenu.svelte';
	import { modal, props } from '../models/Stores/ModalStore';
	import * as Session from '../models/Session';

	$: isRegister = false;
	$: authOpened = false;
	$: isAuthorizing = false;
	$: isAuthorizingError = false;

	$: login = '';
	$: email = '';
	$: password = '';

	async function Login() {
		isAuthorizing = true;
		try {
			if (login == '' || password == '') {
				throw new Error();
			}
			var response = await fetch(
				serverIps[0] + '/Login?username=' + login + '&password=' + password,
				{ method: 'POST' }
			);
			if (response.ok) {
				var result = await response.json();
				Session.setUsername(result.username);
				Session.setRole(jwt_decode(result.access_token)["role"]);
				Session.setToken(result.access_token);
				goto("/")
			}
		} catch {
			isAuthorizingError = true;
		}
		isAuthorizing = false;
	}
</script>

{#if typeof window !== 'undefined'}
	<div
		class="min-h-screen bg-gray-200"
		on:click={() => {
			menu.set(undefined);
			modal.set(undefined);
		}}
	>
		<div class="flex-1 flex flex-col h-14 bg-gray-100 shadow">
			<nav class="flex justify-between h-16 border-b-2 border-none">
				<ul class="flex items-center">
					<li class="h-6 px-4">Blabla</li>
				</ul>

				<ul class="flex flex-grow items-center h-full ml-2">
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Кино </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Сериалы </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Книги </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Люди </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Персонажи </span>
					</li>
					{#if Session.getRole() == 'admin'}
						<li
							class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
							on:click={() => goto('/admin')}
						>
							<span> Администратирование </span>
						</li>
					{/if}
				</ul>

				<ul class="flex-grow" />

				<ul class="flex items-center mr-4">
					{#if Session.isAuthenticated()}
						<button class="p-2 rounded-lg">{Session.getUsername()}</button>
					{:else}
						<button
							class="p-2 rounded-lg bg-gray-200 shadow"
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

	{#if authOpened && !Session.isAuthenticated()}
		<div class="absolute top-14 right-0 bg-white rounded-lg p-4">
			<div class="mx-2 flex flex-col  align-start items-center">
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
						class="rounded w-64 h-[2.5rem] bg-gray-200 outline-none px-2 mb-4 mt-1"
					/>
					<p class="place-self-start text-lg ml-3">Почта</p>
					<input
						bind:value={email}
						class="rounded w-64 h-[2.5rem]  bg-gray-200 outline-none px-2 mb-4 mt-1"
					/>
					<p class="place-self-start text-lg ml-3">Пароль</p>
					<input
						bind:value={password}
						class="rounded w-64 h-[2.5rem] bg-gray-200 outline-none px-2 mb-6 mt-1"
					/>
					<button class="p-2 rounded-lg  bg-gray-200">
						<p>Регистрация</p>
					</button>
				{:else}
					<p class="place-self-start text-lg ml-3">Логин</p>
					<input
						bind:value={login}
						class="rounded w-64 h-[2.5rem]  bg-gray-200 outline-none px-2 mb-4 mt-1"
					/>
					<p class="place-self-start text-lg ml-3">Пароль</p>
					<input
						bind:value={password}
						class="rounded w-64 h-[2.5rem]  bg-gray-200 outline-none px-2 mb-6 mt-1"
					/>
					{#if isAuthorizingError}
						<p class="text-red-500">Неправильный логин или пароль</p>
					{/if}
					<div class="grid grid-cols-2 gap-2">
						<button class="p-2 rounded-lg  bg-gray-200">
							<p>Забыли пароль?</p>
						</button>
						<button
							on:click={Login}
							class="p-2 rounded-lg  bg-gray-200 {isAuthorizing ? 'disabled' : ''}"
						>
							{#if isAuthorizing}
								<svg class="animate-spin h-4 w-4 mr-3" viewBox="0 0 24 24" />
							{/if}
							Войти
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
{:else}
	<div
		class="min-h-screen bg-gray-200"
		on:click={() => {
			menu.set(undefined);
			modal.set(undefined);
		}}
	>
		<div class="flex-1 flex flex-col h-14 bg-gray-100 shadow">
			<nav class="flex justify-between h-16 border-b-2 border-none">
				<ul class="flex items-center">
					<li class="h-6 px-4">Blabla</li>
				</ul>

				<ul class="flex flex-grow items-center h-full ml-2">
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Кино </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Сериалы </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Книги </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Люди </span>
					</li>
					<li class="px-2 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
						<span> Персонажи </span>
					</li>
				</ul>

				<ul class="flex-grow" />

				<ul class="flex items-center mr-4">
					<button
						class="p-2 rounded-lg bg-gray-200 shadow"
						on:click={() => {
							authOpened = !authOpened;
						}}>Авторизация</button
					>
				</ul>
			</nav>
		</div>
		<div class="py-8 px-16">
			<slot />
		</div>
	</div>
{/if}

<ContextMenu />

{#if $modal != null}
	<div
		class="fixed z-10 inset-0 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<svelte:component this={$modal} {...$props} />
	</div>
{/if}
