import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  scrollButtonEnable: boolean;
  title: string = 'Recipe Book';

  ngOnInit(): void {
    this.scrollButtonEnable = true;
  }

  /*
    Scroll function - To detect Scroll button click on home page and move to next section
  */
  scroll(el: HTMLElement) {
    console.log("Scrolled");
    this.scrollButtonEnable = false;
    el.scrollIntoView({behavior:"smooth"});
  }

  /*
    createRecipe function - Triggers dialog box to add a new recipe
  */
  createRecipe(){

  }
}
