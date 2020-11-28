import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(recipes: Recipe[], searchText: string): Recipe[] {
    if(!recipes) {
      return [];
    }
    if(!searchText){
      return recipes;
    }

    searchText = searchText.toLocaleLowerCase();

    return recipes.filter(item => {
      return item.name.toLocaleLowerCase().includes(searchText);
    })
  }

}
