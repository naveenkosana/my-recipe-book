import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  scrollButtonEnable: boolean;
  title: string = 'Recipe Book';
  scrolled:boolean = false;

  @ViewChild('viewRecipes') viewRecipes: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {this.scrolled = $event.srcElement.scrollingElement.scrollTop / $event.srcElement.scrollingElement.scrollHeight > 0.1;
    if(!this.scrolled){
      this.scrollButtonEnable = true;
    }
    else{
      this.scrollButtonEnable = false;
    }
  }

  ngOnInit(): void {
    this.scrollButtonEnable = true;
  }

  /*
    Scroll function - To detect Scroll button click on home page and move to next section
  */
  scroll(el: HTMLElement) {
    this.scrollButtonEnable = false;
    el.scrollIntoView({behavior:"smooth"});
  }
}
