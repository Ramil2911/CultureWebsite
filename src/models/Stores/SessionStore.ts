import {Session} from "../Session"
import { writable } from 'svelte/store';

export const SessionStore = writable(new Session());
