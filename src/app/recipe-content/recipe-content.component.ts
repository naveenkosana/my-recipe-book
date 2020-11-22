import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';

export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  numberOfServings:number;
  imgSrc: string;
  cookingTime: number;
  ingredients:string[];
  preparationSteps:string;
}
@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.component.html',
  styleUrls: ['./recipe-content.component.css']
})



export class RecipeContentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  recipeList :Recipe[];
  recipeCuisines: any[];
  newRecipe: Recipe = {
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
    },
    {
        id:7,
        name:'Pasta',
        cuisine: 'Italian',
        numberOfServings: 2,
        imgSrc:'../../assets/pasta.jpg',
        cookingTime:20,
        ingredients:[],
        preparationSteps:'1. Boil Pasta\n2. Take Pan'
    },
    {
        id:8,
        name:'Gelato',
        cuisine: 'Italian',
        numberOfServings: 7,
        imgSrc:'../../assets/gelato.jpg',
        cookingTime:80,
        ingredients:[],
        preparationSteps:'1. Take Milk\n2. Take Bowl'
    },
    {
        id:9,
        name:'Mousse au chocolat',
        cuisine: 'French',
        numberOfServings: 4,
        imgSrc:'../../assets/mousse.jpg',
        cookingTime:90,
        ingredients:[],
        preparationSteps:'1. Take Milk\n2. Take Bowl'
    },
    {
        id:10,
        name:'Idly',
        cuisine: 'Indian',
        numberOfServings: 4,
        imgSrc:'../../assets/idly.jpg',
        cookingTime:50,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:11,
        name:'Kibbeling',
        cuisine: 'Dutch',
        numberOfServings: 4,
        imgSrc:'../../assets/kibbeling.jpg',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:12,
        name:'Quesadilla',
        cuisine: 'Mexican',
        numberOfServings: 2,
        imgSrc:'../../assets/quesadilla.jpg',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    }];

    this.recipeCuisines = [...new Set(this.recipeList.map(recipe => recipe.cuisine))]; //store all the cuisine values in an array
  }

  /*
  Function to adjust the no of recipes to show based on window size (Under Progress)
  */
  onResize(event){

  }

  /*
  Function to open a dialog to view/edit recipe (Under Progress)
  */
  openRecipe(recipe){
    this.dialog.open(RecipeDialogComponent, {
      data:recipe
    });
  }

  /*
  Function to open a dialog to create a new recipe (Under Progress)
  */
  addRecipe(){
    this.dialog.open(RecipeDialogComponent, {
      data:this.newRecipe
    });
  }

  /*
  Function to return an array of recipes based on the cuisine
  */
  getRecipesByCuisine(cuisine){
    return this.recipeList.filter(recipe => recipe.cuisine == cuisine);
  }

}
