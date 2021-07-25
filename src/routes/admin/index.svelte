<script lang="ts" context="module">
import { goto } from '$app/navigation';

	import { Session } from '../../models/Session';
	import Error from '../__error.svelte';

</script>

<button on:click="{()=>{goto("/admin/movie/addmovie")}}">
	Добавить фильм
</button>
<button on:click="{()=>{goto("/admin/updatemovie")}}">
	Обновить фильм
</button>
<button on:click="{()=>{goto("/admin/removemovie")}}">
	Удалить фильм
</button>