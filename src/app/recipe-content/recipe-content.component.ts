import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import {MatSidenav} from '@angular/material/sidenav';
import { Recipe } from '../recipe';
import { RecipeListService } from '../services/recipe-list.service';
import { SidenavService } from '../services/sidenav.service';


@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrls: ['./recipe-content.component.css']
})



export class RecipeContentComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('snav') public snav: MatSidenav;

  constructor(public dialog: MatDialog,
    private _recipeListService: RecipeListService,
    private _sideNavService: SidenavService) { }

  recipeList :Recipe[];
  recipeCuisines: any[];
  newRecipe: Recipe = {
      id:-99,
      name:'',
      cuisine: '',
      numberOfServings:0,
      imgSrc:'../../assets/food.jpg',
      cookingTime:0,
      ingredients:'',
      preparationSteps:''
  };
  private recipeSubscription = [];
  selectedRecipe: Recipe = this.newRecipe;
  searchText: string = ''

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [`<span class="material-icons">keyboard_arrow_left</span>`, `<span class="material-icons">
    keyboard_arrow_right
    </span>`],
    responsive: {
      0: {
        items: 5
      },
      400: {
        items: 5
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getRecipeList();    
  }

  ngAfterViewInit(){
    this._sideNavService.setSidenav(this.snav);
  }


  /*
    Function to get the recipe List
  */
 getRecipeList(){
  this.recipeSubscription.push(this._recipeListService.getRecipesList().subscribe(
    data => {
      this.recipeList = data;
      this.recipeCuisines = [...new Set(this.recipeList.map(recipe => recipe.cuisine))]; //store all the cuisine values in an array
    },
    error => {
      console.log(error);
    }
  ));
 }


  /*
  Function to open a side bar to view/edit recipe
  */
  openRecipe(recipe: Recipe){
    this.selectedRecipe = recipe;
  }

  /*
  Function to open a dialog to create a new recipe (Under Progress)
  */
  openNewRecipe(){
    this.selectedRecipe = this.newRecipe;
  }

  /*
  Function to return an array of recipes based on the cuisine
  */
  getRecipesByCuisine(cuisine){
    return this.recipeList.filter(recipe => recipe.cuisine == cuisine);
  }

/*
  Function to add or update a recipe to the existing list
  */
  addOrUpdateRecipe(updatedRecipe: Recipe){
    if(updatedRecipe.id == -99){
      this.recipeList.sort((a,b) => a.id - b.id);
      updatedRecipe.id = this.recipeList[this.recipeList.length-1].id + 1; //Give the id for new recipe with the largest id + 1 in the recipe list 
      this.recipeList.push(updatedRecipe);
    }
    else{
      this.recipeList[this.recipeList.indexOf(this.recipeList.find(item => item.id == updatedRecipe.id))] = updatedRecipe;
    }
  }

  ngOnDestroy():void {
    this.recipeSubscription.forEach(sub => sub.unsubscribe());
  }
}
