import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { Skill } from './skill';
import { SkillService } from './skill.service';
import { CharacterRol } from '../character/character-rol/character-rol';
import { CharacterRolService } from '../character/character-rol/character-rol.service';
import { GlobalService } from '../global/global.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skills: Skill[];
  skillPaginator: any;
  filterPost='';
  searchedSkills: Skill[];
  actualPage: number = 0;
  noResults: boolean = false;
  searched: string = '';
  public filterCharacterRol='';
  public charactersRoles: CharacterRol[];

  constructor(private skillService: SkillService,
    private characterRolService: CharacterRolService,
    public globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    /*
    this.skillService.getSkills().subscribe (
      skills => this.skills = skills
    );
    */

    this.getSkillsPerPage();
    
    this.characterRolService.getCharactersRol().subscribe(
      charactersRol => this.charactersRoles = charactersRol);
  }

  //Borrar habilidad
  deleteSkill( skill: Skill) :void{
    this.globalService.playAudioQuack();
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la habilidad ${skill.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#DC3545',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.globalService.playAudioClick();
        this.skillService.deleteSkill(skill.idSkill).subscribe(
          response => {
            this.skills = this.skills.filter(sk => sk !== skill)
        Swal.fire(
          'Eliminado!',
          `La habilidad ${skill.name} ha sido eliminada con éxito`,
          'success'
        )
        
      } 
    )
  }
  else
    this.globalService.playAudioClick();
    })
  }

  findSkillByName(name: string): void{
    this.skillService.getSkillbyName(name).subscribe (
      skills => {
        this.skills = skills;
        this.searched = name;
        if(!this.skills.length){
          this.noResults = true;
        }
      }
    ); 
  } 

  getSkillsPerPage(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.skillService
        .getSkillsPerPage(page)
        .subscribe(response => {
          this.skills = response.content as Skill[];
          this.skillPaginator = response;
        });
    });
  }

  noFilter(): void{
    this.router.navigate([`/skills/page/${this.actualPage}`]);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getSkillsPerPage();
  }

}
