import { Component, OnInit, Inject, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {

  constructor(private _formBuilder: FormBuilder) { }

  @Input('selectedRecipe') selectedRecipe: Recipe;
  @Output() recipeUpdated = new EventEmitter<Recipe>();

  recipeForm: FormGroup;
  isEditMode: boolean = false;
  updatedRecipe: Recipe;
  isNewRecipe: boolean = false;

  ngOnInit(): void {
    // if(this.selectedRecipe.id==-99){
    //   this.isEditMode = true;
    // }
    // this.buildRecipeForm();
  }

  /*
    Build the Recipe Add/Edit form
  */
  buildRecipeForm(): void {
    this.recipeForm = this._formBuilder.group({
      name: [this.selectedRecipe.name,[Validators.required]],
      cuisine:[this.selectedRecipe.cuisine,[Validators.required]],
      numberOfServings:[this.selectedRecipe.numberOfServings,[Validators.required]],
      cookingTime:[this.selectedRecipe.cookingTime,[Validators.required]],
      ingredients:[this.selectedRecipe.ingredients],
      preparationSteps:[this.selectedRecipe.preparationSteps]
    });
  }

  ngOnChanges(): void {
    this.isEditMode = false;
    if(this.selectedRecipe.id==-99){
      this.isEditMode = true;
    }
    this.buildRecipeForm();
    console.log(this.isEditMode);
  }

  /*
    Enable the Edit mode in Form
  */
  editRecipe(): void{
    this.isEditMode = true;
  }

  /*
    Save the newly added / updated recipe and send it to the parent component as an event to store it in the recipe list
  */
  saveRecipe(updatedRecipe): void{
    this.updatedRecipe = {
      id: this.selectedRecipe.id,
      name: updatedRecipe.name,
      cuisine: updatedRecipe.cuisine,
      numberOfServings: updatedRecipe.numberOfServings,
      imgSrc: this.selectedRecipe.imgSrc,
      cookingTime: updatedRecipe.cookingTime,
      ingredients: updatedRecipe.ingredients,
      preparationSteps: updatedRecipe.preparationSteps
    }
    this.selectedRecipe = this.updatedRecipe;
    this.recipeUpdated.emit(this.updatedRecipe);
    this.isEditMode = false;
  }
}
