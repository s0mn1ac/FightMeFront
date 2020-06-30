import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg == null || arg.length<3) return value;
      const resultPosts = [];
    for (const post of value){
      if(post.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
