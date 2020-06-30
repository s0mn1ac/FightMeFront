import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Character } from './character';
import { CharacterService } from './character.service';
import { GlobalService } from '../global/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characters: Character[];
  characterPaginator: any;

  filterPost='';
  actualPage: number = 0;
  noResults: boolean = false;
  searched: string = '';

  constructor(private characterService: CharacterService, public globalService: GlobalService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCharactersPerPage();
  }

  //Borrar personaje
  deleteCharacter(character: Character): void {
    this.globalService.playAudioQuack();
    swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el personaje ${character.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#DC3545',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.globalService.playAudioClick();
        this.characterService.deleteCharacter(character.idCharacter).subscribe(
          response => {
            this.characters = this.characters.filter(ch => ch !== character)
            swal.fire(
              '¡Eliminado!',
              `El personaje ${character.name} ha sido eliminado con éxito`,
              'success'
            )
          }
        )
      }
      else
        this.globalService.playAudioClick();
    })
    
  }

  getCharactersPerPage(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.characterService
        .getCharactersPerPage(page)
        .subscribe(response => {
          this.characters = response.content as Character[];
          this.characterPaginator = response;
        });
    });
  }

  findCharacterByName(name: string): void{
    this.characterService.getCharacterbyName(name).subscribe (
      characters => {
        this.searched = name;
        this.characters = characters;
        if(!this.characters.length){
          this.noResults = true;
        }
      }
    ); 
  }

  noFilter(): void{
    this.router.navigate([`/characters/page/${this.actualPage}`]);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getCharactersPerPage();

  }

}
