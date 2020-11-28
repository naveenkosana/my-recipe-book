import { Component, OnInit, Inject, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecipeListService} from '../recipe-list.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {

  constructor(private _formBuilder: FormBuilder,
    private _recipeListService: RecipeListService) { }

  @Input('selectedRecipe') selectedRecipe: Recipe;
  @Output() recipeUpdated = new EventEmitter<Recipe>();

  recipeForm: FormGroup;
  isEditMode: boolean = false;
  updatedRecipe: Recipe;
  isNewRecipe: boolean = false;

  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;

  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";


  ngOnInit(): void {
    // if(this.selectedRecipe.id==-99){
    //   this.isEditMode = true;
    // }
    // this.buildRecipeForm();
    // this.uploader.progressSource.subscribe(progress => {
    //   this.progress = progress;
    // });
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
  saveRecipe(updatedRecipe){
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
    if(this.updatedRecipe.id == -99){
      this._recipeListService.saveRecipe(this.updatedRecipe).subscribe( data => {
        if(data){
          this.selectedRecipe = this.updatedRecipe;
          this.recipeUpdated.emit(this.updatedRecipe);
          this.isEditMode = false;
        }
      },
      error => {
        console.log(error);
      })
    }
    else{
    this._recipeListService.updateRecipe(this.updatedRecipe).subscribe( data => {
      if(data){
        this.selectedRecipe = this.updatedRecipe;
        this.recipeUpdated.emit(this.updatedRecipe);
        this.isEditMode = false;
      }
    },
    error => {
      console.log(error);
    })
  }
  }

  // onChange(file: File) {
  //   if (file) {
  //     this.fileName = file.name;
  //     this.file = file;

  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = event => {
  //       this.imageUrl = reader.result;
  //     };
  //   }
  // }

  // onUpload() {
  //   this.infoMessage = null;
  //   this.progress = 0;
  //   this.isUploading = true;

  //   this.uploader.upload(this.file).subscribe(message => {
  //     this.isUploading = false;
  //     this.infoMessage = message;
  //   });
  // }

  deleteRecipe(){
    this._recipeListService.deleteRecipe(this.selectedRecipe.id)
    .subscribe(data => {
      if(data){
        alert("Deleted!");
      }
      else{
        alert("Some error");
      }
    },
    error => {
      console.log(error);
    })
  }
}
