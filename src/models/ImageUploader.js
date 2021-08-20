import {serverIps} from "../models/ServerIps"
import * as Session from "../models/Session"

export let uploader = {
    async uploadByFile(file) {
        var form = new FormData();
        form.append("file", file);
        var res = await fetch(serverIps[4]+"/image/addFile", {method: "POST", body: form, headers: new Headers({ Authorization: 'Bearer ' + Session.getToken()})});
        return await res.json();
    },
    async uploadByUrl(url) {
        var res = await fetch(serverIps[4]+"/image/addUrl?url="+url, {method: "POST", headers: new Headers({ Authorization: 'Bearer ' + Session.getToken() })});
        return await res.json();
    }
}