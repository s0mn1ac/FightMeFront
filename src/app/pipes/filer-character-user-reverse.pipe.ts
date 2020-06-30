import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCharacterUserReverse'
})
export class FilterCharacterUserReversePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg == null || arg.length < 3) return value;
      const resultPosts = [];
    for (const post of value){
      if(post.user.userName != arg){
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
