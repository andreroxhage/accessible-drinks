export type Category = {
    title:string;
    drinks:Drink[];
}
export type Drink = {
    strDrink:string;
    strDrinkThumb:string;
    idDrink:number;
}

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

async function apiFetch<T>(path:string): Promise<T> {
    const response = await fetch(BASE_URL + path);

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return await response.json() as T;
}

export async function getCategories(){
    var categories = await apiFetch<{data:{strCategory:string}[]}>('list.php?c=list');

    return categories.data.map(async e => {
        var drinks = await apiFetch<{data:Drink[]}>('filter.php?c=' + e.strCategory);
        var cat:Category = {
            title: e.strCategory,
            drinks: drinks.data
        };
        return cat;
    });
    
}
export async function getDrinksByCategory(category:string) {
    return await apiFetch<{drinks:{strDrink:string, strDrinkThumb:string, idDrink:number}[]}>('filter.php?c=' + category);
}
export async function getIngredients(){
    return await apiFetch<{data:{strIngredient:string}[]}>('list.php?i=list');
}
export async function getDrinksByIngredient(ingredient:string) {
    return await apiFetch<{drinks:{strDrink:string, strDrinkThumb:string, idDrink:number}[]}>('filter.php?i=' + ingredient);
}
export async function getDrinkByName(name:string){
    return await apiFetch<{drink:{}[]}>('search.php?s=' + name);
}