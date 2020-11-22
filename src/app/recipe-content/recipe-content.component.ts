import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrls: ['./recipe-content.component.css']
})


export class RecipeContentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  recipeList :any[];
  recipeCuisines: any[];
  newRecipe: any = {
      id:-99,
      name:'',
      cuisine: '',
      numberOfServings:1 ,
      imgSrc:'',
      cookingTime:60,
      ingredients:[],
      preparationSteps:''
  };

  ngOnInit(): void {
    this.recipeList = [{
      id:1,
      name:'Margherita Pizza',
      cuisine: 'Italian',
      numberOfServings: 4,
      imgSrc:'../../assets/margherita-pizza.jpg',
      cookingTime:60,
      ingredients:[],
      preparationSteps:'1. Make dough\n2. Make round'
    },
    {
        id:2,
        name:'Crepe',
        cuisine: 'French',
        numberOfServings: 4,
        imgSrc:'../../assets/French-Crepes.jpg',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:3,
        name:'Stroopwafel',
        cuisine: 'Dutch',
        numberOfServings: 4,
        imgSrc:'../../assets/stroopwafels.jpg',
        cookingTime:50,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:4,
        name:'Goulash',
        cuisine: 'Hungarian',
        numberOfServings: 4,
        imgSrc:'../../assets/Hungarian_Goulash.jpg',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:5,
        name:'Chicken Biryani',
        cuisine: 'Indian',
        numberOfServings: 4,
        imgSrc:'../../assets/Chicken-Biryani.jpg',
        cookingTime:80,
        ingredients:[],
        preparationSteps:'1. Take Chicken\n2. Take Pan'
    },
    {
        id:6,
        name:'Burrito',
        cuisine: 'Mexican',
        numberOfServings: 4,
        imgSrc:'../../assets/burrito.jpg',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    }];

    this.recipeCuisines = [...new Set(this.recipeList.map(recipe => recipe.cuisine))];
  }

  onResize(event){

  }

  openRecipe(recipe){
    this.dialog.open(RecipeDialogComponent, {
      data:recipe
    });
  }
  addRecipe(){
    this.dialog.open(RecipeDialogComponent, {
      data:this.newRecipe
    });
  }

  getRecipesByCuisine(cuisine){
    return this.recipeList.filter(recipe => recipe.cuisine == cuisine);
  }

}
