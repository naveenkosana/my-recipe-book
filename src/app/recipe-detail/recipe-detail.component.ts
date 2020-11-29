import { Component, OnInit, TemplateRef, Input, OnChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecipeListService} from '../services/recipe-list.service';
import { Recipe } from '../recipe';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {

  constructor(private _formBuilder: FormBuilder,
    private _recipeListService: RecipeListService,
    private _sidenavService: SidenavService,
    public dialog: MatDialog) { }

  @Input('selectedRecipe') selectedRecipe: Recipe;
  @Output() recipeUpdated = new EventEmitter<Recipe>();
  @Output() refreshRecipeList = new EventEmitter<boolean>();
  @ViewChild('deleteDialog', {static: false}) deleteDialog: TemplateRef<any>;


  recipeForm: FormGroup;
  isEditMode: boolean = false;
  updatedRecipe: Recipe;
  isNewRecipe: boolean = false;


  ngOnInit(): void {
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
  saveRecipe(recipeForm){
    console.log(this.recipeForm.valid);
    if(this.recipeForm.valid){
      var updatedRecipe = this.recipeForm.value;
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
          // this.recipeUpdated.emit(this.updatedRecipe);
          this.refreshRecipeList.emit(true);
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
        // this.recipeUpdated.emit(this.updatedRecipe);
        this.refreshRecipeList.emit(true);
        this.isEditMode = false;
      }
    },
    error => {
      console.log(error);
    })
  }
    }
    else{
      console.log("Invalid inputs");
    }
  }

  /*
    Function to open delete Dialog for user confirmation
  */
  openDialog() {
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /*
    Function to delete recipe
  */
  deleteRecipe(){
    this._recipeListService.deleteRecipe(this.selectedRecipe.id)
    .subscribe(data => {
      this.dialog.closeAll();
      if(data){
        alert("Deleted!");
        this.refreshRecipeList.emit(true);
        this.closeSideNav();
      }
      else{
        alert("Some error");
      }
    },
    error => {
      console.log(error);
    })
  }

  cancelForm(){
    this.isEditMode = false;
  }

  closeSideNav(){
    this._sidenavService.close();
  }
}
