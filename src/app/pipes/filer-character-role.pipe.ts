import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCharacterRole'
})
export class FilterCharacterRole implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg == null || arg.length < 3) return value;
      const resultPosts = [];
    for (const post of value){
      if(post.characterRolName == arg){
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
