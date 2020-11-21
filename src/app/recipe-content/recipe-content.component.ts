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
  newRecipe: any = {
      id:-99,
      name:'',
      type: '',
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
      type: 'Italian',
      numberOfServings: 4,
      imgSrc:'',
      cookingTime:60,
      ingredients:[],
      preparationSteps:'1. Make dough\n2. Make round'
    },
    {
        id:2,
        name:'Crepe',
        type: 'French',
        numberOfServings: 4,
        imgSrc:'',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:3,
        name:'Stroopwafel',
        type: 'Dutch',
        numberOfServings: 4,
        imgSrc:'',
        cookingTime:50,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:4,
        name:'Goulash',
        type: 'Hungarian',
        numberOfServings: 4,
        imgSrc:'',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    },
    {
        id:5,
        name:'Chicken Biriyani',
        type: 'Indian',
        numberOfServings: 4,
        imgSrc:'',
        cookingTime:80,
        ingredients:[],
        preparationSteps:'1. Take Chicken\n2. Take Pan'
    },
    {
        id:6,
        name:'Burrito',
        type: 'Mexican',
        numberOfServings: 4,
        imgSrc:'',
        cookingTime:40,
        ingredients:[],
        preparationSteps:'1. Make Batter\n2. Take Pan'
    }]
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

}
