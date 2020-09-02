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
  if (desiredServings < 0 || desiredServings === servingsAmount) {
    return {
      servingPerPerson: servingsAmount,
      ingredients,
      ingredientsTotal,
    };
  }
  const scaledIngredients = ingredients.map(ingredient => ingredient.scaleTo(servingsAmount, desiredServings));
  return {
    ingredients: scaledIngredients,
    servingPerPerson: desiredServings,
    ingredientsTotal: sumIngredients(scaledIngredients),
  };
}

function sumIngredients(ingredients: Ingredient[]): number {
  return ingredients.reduce((total, ingredient) => ingredient.quantity.amount + total, 0);
}
