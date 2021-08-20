import { getCookie, createCookie } from '../models/Cookies';

export function isAuthenticated(): Boolean {
	return (
		getCookie('access_token') != '' &&
		getCookie('username') != '' &&
		getCookie('role') != '' &&
		getCookie('userId') != ''
	);
}

export function getToken(): string {
	var token = getCookie('access_token');
	if (token != '') return token;
}

export function setToken(token: string): void {
	createCookie('access_token', token);
}

export function getUsername(): string {
	var token = getCookie('username');
	if (token != '') return token;
}

export function setUsername(name: string): void {
	createCookie('username', name);
}

export function getRole(): string {
	var token = getCookie('role');
	if (token != '') return token;
}

export function setRole(role: string): void {
	createCookie('role', role);
}

export function getUserid(): number {
	var userIdString = getCookie('userId');
	if (userIdString != '') return parseInt(userIdString);
}

export function setUserid(id: number): void {
	createCookie('userId', id);
}
