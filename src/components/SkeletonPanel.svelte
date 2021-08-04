<div class="animate-pulse">
    <div class="flex flex-col rounded-lg bg-[#203040] h-[22rem] w-48 text-white cursor-pointer">
        <div class="h-[68%] rounded-t-lg"/>
        <div class="flex mx-1 flex-grow w-full">
            <div class="flex flex-col pl-2 pt-2 pr-2 pb-1">
                <p class="text-lg"></p>
                <p></p>
                <div class="flex content-center flex-wrap flex-grow gap-1">
                    {#each Array(5) as _, i}
                        <div class="text-xs rounded-lg bg-red-900 px-1 animate-pulse w-8">
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>