import { Pipe, PipeTransform } from '@angular/core';
import { CharacterRol } from '../character/character-rol/character-rol';

@Pipe({
  name: 'filterRol'
})
export class FilterRolPipe implements PipeTransform {

  transform(value: any, characterRol: any) {
  if (characterRol === '' || characterRol == null || characterRol.length<3) return value;
    const skills = [];
  for (const skill of value){
    for(let rol of skill.characterRoles){
      if(rol.characterRolName.toLowerCase().indexOf(characterRol.toLowerCase())>-1){
        skills.push(skill);
      };
   }
  };
  return skills;
}

}
