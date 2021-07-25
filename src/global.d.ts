/// <reference types="@sveltejs/kit" />

const serverIps: string[] = [
	'https://localhost:5001', //Accounts
	'https://localhost:5011', //Movies
	'https://localhost:5021', //Characters
	'https://localhost:5031', //Persons
	'https://localhost:5051' //Images
];

declare var token: string = '';
declare var accountName: string = '';
declare var isAuthorized: boolean = false;

export { token, accountName, isAuthorized };
