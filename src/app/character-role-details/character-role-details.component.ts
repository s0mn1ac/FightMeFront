import { Component, OnInit, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Skill } from '../skill/skill';
import { SkillService } from '../skill/skill.service';
import { CharacterRol } from '../character/character-rol/character-rol';
import { CharacterRolService } from '../character/character-rol/character-rol.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-character-role-details',
  templateUrl: './character-role-details.component.html',
  styleUrls: ['./character-role-details.component.css']
})
export class CharacterRoleDetailsComponent implements OnInit {

  public skills: Skill[] = [];
  public charactersRol: CharacterRol[] = [];
  filterPost='';
  
  levelIni: number = 1;
  expIni: number = 0;
  expReq: number = 100;
  expPerBattle: number = 10;
  statsPerLevel: number = 1;

  viewGuerrero: boolean;
  viewArquero: boolean;
  viewMago: boolean;

  selected: string = "";
  color: string = "black";

  stats: string[][] = [ ["80", "50", "30", "10", "20"], ["75", "20", "20", "60", "50"], ["70", "30", "60", "30", "50"] ];

  constructor(private skillService: SkillService,
    public characterRolService: CharacterRolService,
    private activatedRoute: ActivatedRoute,
    public globalService: GlobalService) { }

  ngOnInit(): void {

    this.skillService.getSkills().subscribe (
      skills => this.skills = skills
    );

    this.characterRolService.getCharactersRol().subscribe(rol => {
      this.charactersRol = rol;
      this.loadCharacter();
    });

  }

  loadCharacter(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.charView(id);
        window.addEventListener('load', function () {
          let sel: HTMLInputElement = document.querySelector('#radio-' + id.toLowerCase());
          sel.checked=true;
        });
      }
    })
  }

  

  charView(rol: string): void {

    if (rol == "GUERRERO") {
      this.viewArquero = false;
      this.viewMago = false;
      this.viewGuerrero = !this.viewGuerrero;
      if (this.viewGuerrero == true) {
        this.selected = rol;
        this.color = "#adc6fd";
      } else {
        this.selected = "";
      }
    }

    if (rol == "MAGO") {
      this.viewArquero = false;
      this.viewGuerrero = false;
      this.viewMago = !this.viewMago;
      if (this.viewMago == true) {
        this.selected = rol;
        this.color = "#926f9f";
      } else {
        this.selected = "";
      }
    }

    if (rol == "ARQUERO") {
      this.viewMago = false;
      this.viewGuerrero = false;
      this.viewArquero = !this.viewArquero;
      if (this.viewArquero == true) {
        this.selected = rol;
        this.color = "#cdc26e";
      } else {
        this.selected = "";
      }
    }

  }

  getStats(rol: string, stat: string): string {

    if (stat == "hp") {
      if (rol == "GUERRERO") {
        return this.stats[0][0];
      } else if (rol == "MAGO") {
        return this.stats[1][0];
      } else if (rol == "ARQUERO") {
        return this.stats[2][0];
      } else {
        return "UNDEFINED";
      }
    }

    if (stat == "strength") {
      if (rol == "GUERRERO") {
        return this.stats[0][1];
      } else if (rol == "MAGO") {
        return this.stats[1][1];
      } else if (rol == "ARQUERO") {
        return this.stats[2][1];
      } else {
        return "UNDEFINED";
      }
    }

    if (stat == "speed") {
      if (rol == "GUERRERO") {
        return this.stats[0][2];
      } else if (rol == "MAGO") {
        return this.stats[1][2];
      } else if (rol == "ARQUERO") {
        return this.stats[2][2];
      } else {
        return "UNDEFINED";
      }
    }

    if (stat == "magic") {
      if (rol == "GUERRERO") {
        return this.stats[0][3];
      } else if (rol == "MAGO") {
        return this.stats[1][3];
      } else if (rol == "ARQUERO") {
        return this.stats[2][3];
      } else {
        return "UNDEFINED";
      }
    }

    if (stat == "intelligence") {
      if (rol == "GUERRERO") {
        return this.stats[0][4];
      } else if (rol == "MAGO") {
        return this.stats[1][4];
      } else if (rol == "ARQUERO") {
        return this.stats[2][4];
      } else {
        return "UNDEFINED";
      }
    }

  }

}
