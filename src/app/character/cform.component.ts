import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Character } from './character';
import { CharacterService } from './character.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { CharacterRol } from './character-rol/character-rol';
import { CharacterRolService } from './character-rol/character-rol.service';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-cform',
  templateUrl: './cform.component.html',
  styleUrls: ['./cform.component.css']
})
export class CformComponent implements OnInit {

  public character: Character = new Character;
  public characterSelected: string = "peasant.png";
  public validadores: string[];
  public charactersRol: CharacterRol[];

  users: User[];

  constructor(public characterService: CharacterService,
    public userService: UserService,
    private characterRolService: CharacterRolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public globalService: GlobalService) { }

  ngOnInit(): void {

    this.loadCharacter();

    this.userService.getUsers().subscribe(
      users => this.users = users);

    this.characterRolService.getCharactersRol().subscribe(
      users => this.charactersRol = users);

  }

  //Añadir personaje
  public addCharacter(): void {
    this.characterService.addCharacter(this.character).subscribe(
      character => {
        this.router.navigate(['/characters/page/0'])
        swal.fire('Nuevo personaje', `Nuevo personaje creado con éxito!`, 'success');
      }
    )
  }

  //Buscar personaje por id
  loadCharacter(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.characterService.getCharacter(id).subscribe((character) => this.character = character)
      }
    });
  }

  //Modificar personaje
  modifyCharacter(): void {
    this.characterService.modifyCharacter(this.character).subscribe(
      character => {
        this.router.navigate(['/characters/page/0'])
        swal.fire('Personaje Actualizado', `Personaje ${character.name} actualizado con éxito`, 'success')
      }
    )
  }

  public compareUsers(o1: User, o2: User): boolean {
    return o1 == null || o2 == null ? false : o1.userName == o2.userName;
  }

  public compareRoles(o1: CharacterRol, o2: CharacterRol): boolean {
    return o1 == null || o2 == null ? false : o1.characterRolName == o2.characterRolName;
  }

  return(): void {
    this.globalService.playAudioClick();
    this.router.navigate(['/characters/page/0']);
  }

  updateImg() {
    if(this.character?.characterRol) {
      let img: HTMLInputElement = document.querySelector('#update-img');
      let route: string = "http://localhost:8090/character/uploads/img/";
      img.src = route + this.character.characterRol.characterRolName.toLowerCase() + ".png";
      this.updateStats();
    }
  }

  updateStats() {

    let fortaleza: HTMLInputElement = document.querySelector('#fortaleza');
    let vida: HTMLInputElement = document.querySelector('#vida');
    let velocidad: HTMLInputElement = document.querySelector('#velocidad');
    let inteligencia: HTMLInputElement = document.querySelector('#inteligencia');
    let magia: HTMLInputElement = document.querySelector('#magia');
    
    let nivel: HTMLInputElement = document.querySelector('#nivel');
    let experiencia: HTMLInputElement = document.querySelector('#experiencia');

    nivel.value = "1";
    experiencia.value = "0";

    this.character.lvl = 1;
    this.character.experience = 0;

    if(this.character.characterRol.characterRolName == "GUERRERO") {
      fortaleza.value = "50";
      vida.value = "80";
      velocidad.value = "30";
      inteligencia.value = "20";
      magia.value = "10";

      this.character.strength = 50;
      this.character.hp = 80;
      this.character.speed = 30;
      this.character.intelligence = 20;
      this.character.magic = 10;
    }

    if(this.character.characterRol.characterRolName == "MAGO") {
      fortaleza.value = "20";
      vida.value = "75";
      velocidad.value = "20";
      inteligencia.value = "50";
      magia.value = "60";

      this.character.strength = 20;
      this.character.hp = 75;
      this.character.speed = 20;
      this.character.intelligence = 50;
      this.character.magic = 60;
    }

    if(this.character.characterRol.characterRolName == "ARQUERO") {
      fortaleza.value = "30";
      vida.value = "70";
      velocidad.value = "60";
      inteligencia.value = "50";
      magia.value = "30";

      this.character.strength = 30;
      this.character.hp = 70;
      this.character.speed = 60;
      this.character.intelligence = 50;
      this.character.magic = 30;
    }

  }

}
