import { Ingredient, Servings } from '../model';

export type ServingCalculator = () => number;
export interface ServingOptions {
  servings: Servings;
  desiredServings: number;
}
export function servingsCalculator({
  servings: { servingPerPerson: servingsAmount, ingredients, ingredientsTotal },
  desiredServings,
}: ServingOptions): Servings {
  if (desiredServings === 0 || desiredServings === servingsAmount) {
    return {
      servingPerPerson: servingsAmount,
      ingredients,
      ingredientsTotal,
    };
  }
  // create new ingredients with scaled amount
  const scaledIngredients = ingredients.map(ingredient => ingredient.scaleTo(servingsAmount, desiredServings));
  console.log("ingredients", scaledIngredients.map(el => el.displayString()));
  // sum up ingredients
  return {
    ingredients: scaledIngredients,
    servingPerPerson: desiredServings,
    ingredientsTotal: sumIngredients(scaledIngredients),
  };
}

function sumIngredients(ingredients: Ingredient[]): number {
  return ingredients.reduce((total, ingredient) => ingredient.quantity.amount + total, 0);
}
