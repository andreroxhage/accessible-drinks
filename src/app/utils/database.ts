export type Category = {
    title:string;
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

export async function getCategories():Promise<Category[]>{
    var categories = await apiFetch<{data:{strCategory:string}[]}>('list.php?c=list');

    return categories.data.map(data => {
        let category:Category = {
            title:data.strCategory
        }
        return category;
    });
}

export async function getDrinksByCategory(category:Category) {
    return await apiFetch<{drinks:{strDrink:string, strDrinkThumb:string, idDrink:number}[]}>('filter.php?c=' + category.title);
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