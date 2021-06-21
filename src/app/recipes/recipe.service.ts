
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = [
    new Recipe('Meat Cakes',
      'Traditional cakes',
      'https://cpb-us-e1.wpmucdn.com/blogs.uoregon.edu/dist/c/829/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),

    new Recipe('Fish Cakes',
      'Fun cakes',
      'https://cpb-us-e1.wpmucdn.com/blogs.uoregon.edu/dist/c/829/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg',
      [
        new Ingredient('Fun', 200),
        new Ingredient('More Fun', 300)
      ])

  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
