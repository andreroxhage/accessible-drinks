export interface Drink {
  strTags: any;
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions?: string;
  
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}