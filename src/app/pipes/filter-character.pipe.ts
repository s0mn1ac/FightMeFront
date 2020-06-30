import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCharacter'
})
export class FilterCharacterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg == null || arg.length<3) return value;
      const resultPosts = [];
    for (const post of value){
      if(post.characterRol.characterRolName.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
