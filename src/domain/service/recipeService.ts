import { Ingredient, Quantity, Recipe } from '../model';
import { Entity, getStoreInstance, Persistable, Storage } from './store';

const prefix = 'recipe';
const storage: Storage<Entity<Recipe>> = getStoreInstance(prefix, loadRecipe);

export function newRecipe(): Entity<Recipe> {
  return new RecipeEntity(storage);
}

export function readAll(): ReadonlyArray<Entity<Recipe>> {
  return storage.readAll();
}

class RecipeEntity implements Recipe, Persistable<Recipe> {
  id?: string;
  title: string = '';
  servings: Quantity = { amount: 1, unitOfMeasure: 'Person' };
  ingredients: ReadonlyArray<Ingredient> = [];
  instructions: string = '';
  preperationTime: Quantity = { amount: 1, unitOfMeasure: 'Hours' };

  constructor(private storage: Storage<Recipe>) {}

  read(): Recipe {
    if (this.id) {
      const self = this.storage.read(this.id);
      return Object.assign({}, this, self);
    }
    return this;
  }
  save(): Recipe {
    this.storage.save(this);
    return this;
  }
  delete(): void {
    if (this.id) {
      this.storage.delete(this.id);
    }
  }
}

function loadRecipe(recipeData: Entity<Recipe>): Entity<Recipe> {
  const recipe = newRecipe();
  recipe.id = recipeData.id;
  recipe.ingredients = recipeData.ingredients;
  recipe.instructions = recipeData.instructions;
  recipe.preperationTime = recipeData.preperationTime;
  recipe.servings = recipeData.servings;
  recipe.title = recipeData.title;
  return recipe;
}
