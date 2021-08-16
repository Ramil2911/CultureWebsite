import { serverIps } from './ServerIps';

export class Post {
	guid: string;
	name: string;
	authorId: BigInt;
	title: string;
	bodyHtml: string;
	bodyRaw: string;
	note: string;

	constructor(
		guid: string,
		name: string,
		authorId: BigInt,
		title: string,
		bodyHtml: string,
		bodyRaw: string,
		note: string
	) {
		this.guid = guid;
		this.name = name;
		this.authorId = authorId;
		this.title = title;
		this.bodyHtml = bodyHtml;
		this.bodyRaw = bodyRaw;
		this.note = note;
	}
}

export async function fetchPost(PostId: BigInt): Promise<Post> {
	let Post: Post;

	var promise: Promise<Response> = fetch(serverIps[1] + '/posts/FetchPost?guid=' + PostId);
	promise.catch((x) => console.log(x.stack));

	var response = await promise;
	if (!response.ok) {
		throw new Error('fuck');
	}

	var json = await response.json();
	console.log(json);

	Object.assign(Post, json);
	return Post;
}

export async function fetchDraft(PostId: BigInt): Promise<Post> {
	let Post: Post;

	var promise: Promise<Response> = fetch(serverIps[1] + '/posts/FetchDraft?guid=' + PostId);
	promise.catch((x) => console.log(x.stack));

	var response = await promise;
	if (!response.ok) {
		throw new Error('fuck');
	}

	var json = await response.json();
	console.log(json);

	Object.assign(Post, json);
	return Post;
}
