import { Drink } from "../types";

export type Category = {
    title:string;
}
const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

async function apiFetch<T>(path:string): Promise<T> {
    const response = await fetch(BASE_URL + path);

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return await response.json() as T;
}

export async function getDrinksByCategory(category:string) {
    var {drinks} = await apiFetch<{drinks:Drink[]}>('filter.php?c=' + category);
    return drinks;
}
export async function getDrinksByIngredient(ingredient:string) {
    var {drinks} = await apiFetch<{drinks:Drink[]}>('filter.php?i=' + ingredient); 
    return drinks;
}

export async function getDrinkByName(name:string){
    return await apiFetch<{drink:{}[]}>('search.php?s=' + name);
}
export async function getDrinks() {
    var {drinks} = await apiFetch<{drinks:Drink[]}>("filter.php?a=Alcoholic");
    return drinks;
}