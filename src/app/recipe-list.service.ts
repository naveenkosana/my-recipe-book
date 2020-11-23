import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeListService {

  constructor(private _http: HttpClient) { }

  recipeListUrl = 'assets/recipes.json';

  getRecipesList() {
    return this._http.get<Recipe[]>(this.recipeListUrl);
  }
}
