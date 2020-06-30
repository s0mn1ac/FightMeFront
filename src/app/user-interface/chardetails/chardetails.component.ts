import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from 'src/app/character/character.service';
import { Router } from '@angular/router';
import { ChardetailsService } from './chardetails.service';
import { Character } from 'src/app/character/character';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-chardetails',
  templateUrl: './chardetails.component.html',
  styleUrls: ['./chardetails.component.css']
})
export class ChardetailsComponent implements OnInit {

  @Input() character: Character;

  loggedUser: string;

  constructor(private characterService: CharacterService, private router: Router, public charDetailsService: ChardetailsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.credentials.name;
  }

  closeDetails() {
    this.charDetailsService.closeModal();
  }

}
