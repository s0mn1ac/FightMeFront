import { User } from '../user/user';
import { CharacterRol } from './character-rol/character-rol';

export class Character {

  idCharacter: number;
  name: string;
  lvl: number;
  experience: number;
  strength: number;
  magic: number;
  hp: number;
  speed: number;
  intelligence: number;
  user: User;
  characterRol: CharacterRol;
  img: string;
  victories: number;
  defeats: number;

}
