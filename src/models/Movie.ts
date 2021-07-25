import { serverIps } from './ServerIps';

export class Movie {
	id: BigInt;
	name: string;
	originalName: string;
	posterId: BigInt;
	description: string;
	genres: number[];
	year: Number;
	country: string;
	minimalAge: number;

	constructor(
		id: BigInt,
		name: string,
		posterId: BigInt,
		description: string,
		genres: number[],
		year: Number,
		country: string,
		minimalAge: number
	) {
		this.id = id;
		this.name = name;
		this.posterId = posterId;
		this.genres = genres;
		this.year = year;
		this.country = country;
		this.minimalAge = minimalAge;
	}
}

export async function fetchMovie(movieId: BigInt): Promise<Movie> {
	let movie: Movie;

	var promise: Promise<Response> = fetch(serverIps[1] + '/movies/FetchMovie?id=' + movieId);
	promise.catch((x) => console.log(x.stack));

	var response = await promise;
	if (!response.ok) {
		throw new Error('fuck');
	}

	var json = await response.json();
	console.log(json);

	Object.assign(movie, json);
	return movie;
}
