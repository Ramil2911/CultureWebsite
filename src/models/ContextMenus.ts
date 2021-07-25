import Context from  "../components/contextMenu/Context.svelte"
import MovieContextMenu from "../components/contextMenu/MovieContextMenu.svelte"

export class ContextMenus {
    static currentMenu = MovieContextMenu;
    static currentProps: any[] = [];
}
