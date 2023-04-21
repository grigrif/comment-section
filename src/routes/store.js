import { writable } from 'svelte/store';
import data  from "./data.json";

export const comments = writable(data.comments);
export const current_id = writable(5);