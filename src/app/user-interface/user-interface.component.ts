import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Character } from '../character/character';
import { CharacterService } from '../character/character.service';
import { find, ignoreElements } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChardetailsService } from './chardetails/chardetails.service';
import { CharacterRol } from '../character/character-rol/character-rol';
import { CharacterRolService } from '../character/character-rol/character-rol.service';
import { UserInterfaceService } from './user-interface.service';
import { AuthService } from '../login/auth.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  user: string;
  loggedUser: User;
  characters: Character[] = [];
  characterSelected: Character;
  charactersRol: CharacterRol[];
  filterCharacterRol = '';
  //showButton: boolean = false;

  totalVictories: number = 0;
  totalDefeats: number = 0;
  totalBattles: number = this.totalVictories + this.totalDefeats;
  winRate;
  
  constructor(public characterService: CharacterService, private charDetailsService: ChardetailsService,
      public characterRolService: CharacterRolService, public userInterfaceService: UserInterfaceService,
      public authService: AuthService, public userService: UserService,
      public globalService: GlobalService
      ) { }

  ngOnInit(): void {
    this.user = this.userInterfaceService.authService.credentials.name;
    this.userService.getUserByUserName(this.userInterfaceService.authService.credentials.name).subscribe(user => this.loggedUser = user);
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
      this.total();
    });
    this.characterRolService.getCharactersRol().subscribe(charactersRol => this.charactersRol = charactersRol);
  }

  openDetails(character: Character) {
    this.characterSelected = character;
    this.charDetailsService.openModal();
  }

  /*
  switch() {
    this.showButton = !this.showButton;
  }
  */
  
  total() {

    this.characters.forEach(character => {

      if (character.user.userName == this.user) {
        this.totalVictories = this.totalVictories + character.victories;
        this.totalDefeats = this.totalDefeats + character.defeats;
        this.totalBattles = this.totalVictories + this.totalDefeats;
        this.winRate = ((this.totalVictories * 100) / this.totalBattles).toFixed(2);
      }
      
    });

  }

}