import { writable } from 'svelte/store';
import { getAllStorageInfo } from "./setLocal"

export const yourName = writable("Put your name here")

export const optionInfo = writable(getAllStorageInfo()[0])

export const currentQuestions = writable({})

