import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Skill } from './skill';
import { SkillService } from './skill.service';
import { CharacterRol } from '../character/character-rol/character-rol';
import { CharacterRolService } from '../character/character-rol/character-rol.service';
import { GlobalService } from '../global/global.service';
@Component({
  selector: 'app-sform',
  templateUrl: './sform.component.html',
  styleUrls: ['./sform.component.css']
})
export class SformComponent implements OnInit {

  public skill: Skill = new Skill();
  public validadores: string[];
  public actions: string[] = ["ATAQUE", "DEFENSA", "CURA"];
  public charactersRol: CharacterRol[];

  constructor(public skillService: SkillService,
    public characterRolService: CharacterRolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public globalService: GlobalService) { }

  ngOnInit(): void {
    this.loadSkill();
    
    this.characterRolService.getCharactersRol().subscribe(
      users => this.charactersRol = users);
  }

   //Añadir habilidad
   public addSkill(): void {
    this.globalService.playAudioClick();
    this.skillService.addSkill(this.skill).subscribe(
      skill => {
        this.router.navigate(['/skills/page/0'])
        swal.fire('Nueva habilidad', `Nueva habilidad creada con éxito!`, 'success');
      }
    )
  }

  //Buscar habilidad por nombre
  loadSkill(): void {
    this.activatedRoute.params.subscribe(params => {
      let idSkill = params['idSkill']
      if (idSkill) {
        this.skillService.getSkill(idSkill).subscribe((skill) => this.skill = skill);
      }
    })
  }

  modifySkill(): void {
    this.globalService.playAudioClick();
    this.skillService.modifySkill(this.skill).subscribe(
      skill => {
        this.router.navigate(['/skills/page/0'])
        swal.fire('Habilidad Actualizada', `Habilidad ${this.skill.name} actualizada con éxito`, 'success')
      }
    )
  }

  return(): void {
    this.globalService.playAudioClick();
    this.router.navigate(['/skills/page/0']);
  }

  public compareRoles(o1: CharacterRol, o2: CharacterRol): boolean {
    return o1 == null || o2 == null ? false : o1.characterRolName == o2.characterRolName;
  }

}
