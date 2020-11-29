import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipe';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeListService {

  constructor(private _http: HttpClient) { }

  recipeListUrl = 'assets/recipes.json';
  recipeApiUrl = 'http://localhost:5000';

 

  getRecipesList() {
    return this._http.get<Recipe[]>(this.recipeApiUrl+'/getRecipes');
  }

  updateRecipe(recipe: Recipe){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(this.recipeApiUrl + '/recipe/' + recipe.id, recipe, options);
  }

  saveRecipe(recipe: Recipe){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(this.recipeApiUrl + '/recipe/', recipe, options);
  }

  deleteRecipe(recipeId: number){
    return this._http.delete(this.recipeApiUrl + '/recipe/' + recipeId);
  }
}
