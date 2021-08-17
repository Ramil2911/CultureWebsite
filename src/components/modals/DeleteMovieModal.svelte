<script lang="ts">
    import type {Movie} from "../../models/Movie"
	import { modal, props as modalProps } from '../../models/Stores/ModalStore';

    export let movie: Movie;
</script>

<div class="w-full h-full backdrop-filter bg-opacity-25 bg-gray-900">
    <div class="centered">
        <div class="bg-white rounded-xl p-4 max-w-[280px]">
            <p class="text-xl">Вы действительно хотите удалить {movie.name}?</p>
            <p class="mt-2">Возможно, это приведет вас к тому, что вам придется заново заполнять данные.</p>
            <div class="flex justify-evenly w-full mt-2">
                <button class="rounded-xl bg-red-500 p-2 flex-grow mr-1">
                    Удалить
                </button>
                <button on:click="{()=>{
                    modal.set(null)
                    modalProps.set(null)
                }}" class="rounded-xl bg-blue-500 p-2 flex-grow ml-1">
                    Отмена
                </button>
            </div>
        </div>
    </div>
</div>

<style>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
