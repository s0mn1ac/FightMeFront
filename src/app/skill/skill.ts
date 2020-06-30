import { CharacterRol } from '../character/character-rol/character-rol';

export class Skill {

  idSkill: number;
  name: string;
  description: string;
  action: string;
  quantity: number;
  characterRoles: CharacterRol[];

}
