import { Skill } from '../skill/skill';
import { Character } from '../character/character';

export class Fight {

  movesPlayer1: Skill[];
  movesPlayer2: Skill[];
  allMoves: Skill[];
  winner: Character;
  faster: Character;
  moveOpponent: Skill;
  hp1: number;
  hp2: number;
  
}
