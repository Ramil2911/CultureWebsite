<script lang="ts">
    import type {Movie} from "../../models/Movie"
    import {SessionStore} from "../../models/Stores/SessionStore"
    import {modal} from "../../models/Stores/ModalStore"
    import DeleteMovieModal from "../modals/DeleteMovieModal.svelte";

	export let pos: { x: Number; y: Number } = { x: 0, y: 0 };
    export let movie: Movie;
</script>

<div style="position:absolute;top:{pos.y}px;left:{pos.x}px;">
	<div class="bg-[#253545] text-white flex flex-col text-left rounded-lg">
        <button class="px-2 pt-1 pb-0.5 rounded-t-lg hover:bg-[#304050] text-left ">
            Открыть "{movie.name}"
        </button>
        <button class="px-2 py-0.5 {$SessionStore.role=="admin" ? "" : "pb-1 rounded-b-lg"} hover:bg-[#304050] text-left">
            Добавить в Избранное
        </button>
        {#if $SessionStore.role=="admin"}
        <button class="px-2 py-0.5 hover:bg-[#304050] text-left">
            Редактировать
        </button>
        <button class="px-2 pb-1 rounded-b-lg hover:bg-[#304050] text-left " on:click="{()=>{modal.set(DeleteMovieModal)}}">
            Удалить (!)
        </button>
        {/if}
    </div>
</div>
