import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CharacterService } from '../character/character.service';
import { Character } from '../character/character';
import { BattleService } from './battle.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Fight } from './fight';
import { Skill } from '../skill/skill';
import { SkillService } from '../skill/skill.service';
import { MovesControl } from './moves-control';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private autoScroll: ElementRef;

  userPlayer1: string = "";
  userPlayer2: string = "";
  character: Character;
  character1: Character;
  character2: Character;
  characters: Character[] = [];
  winner: Character;
  fight: Fight;
  movesPlayer1: Skill[];
  movesPlayer2: Skill[];
  allMoves: Skill[];
  character1First: Boolean;
  fasterCharacter: Character;
  manualFight: Boolean = false;
  skills: Skill[];
  player1HP: number;
  player2HP: number;
  moveUser1: Skill;
  cont: number = 0;
  chooseMode: boolean = false;

  audioMouseOver = new Audio();
  audioClick = new Audio();

  movesControlFight: MovesControl[] = [];
  moveControlFight: MovesControl;

  // TEST
  test: MovesControl[] = [];
  testSkill: Skill;
  testMove: MovesControl;

  player1Dead: boolean = false;
  player2Dead: boolean = false;

  constructor(private characterService: CharacterService, private battle: BattleService,
               private activatedRoute: ActivatedRoute, private skillService: SkillService,
               public globalService: GlobalService) {

                this.testSkill = new Skill();
                this.testMove = new MovesControl();

                this.testSkill.idSkill = 1;
                this.testSkill.description = "Golpea a un enemigo con tu puño";
                this.testSkill.action = "ATAQUE";
                this.testSkill.name = "Golpetazo";
                this.testSkill.quantity = 3;

                this.testMove.i = 1;
                this.testMove.movePlayer1 = this.testSkill;
                this.testMove.movePlayer2 = this.testSkill;

                this.test.push(this.testMove);

                this.testMove = new MovesControl();
                this.testMove.i = 2;
                this.testMove.movePlayer1 = this.testSkill;
                this.testMove.movePlayer2 = this.testSkill;
                this.test.push(this.testMove);

                this.testMove = new MovesControl();
                this.testMove.i = 3;
                this.testMove.movePlayer1 = this.testSkill;
                this.testMove.movePlayer2 = this.testSkill;
                this.test.push(this.testMove);

                }

  ngOnInit(): void {

    this.userPlayer1 = this.battle.authService.credentials.name;

    this.characterService.getCharacters().subscribe(
      chars => this.characters = chars
    )

    this.skillService.getSkills().subscribe (
      skills => this.skills = skills
    );

    this.loadCharacter();

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.autoScroll.nativeElement.scrollTop = this.autoScroll.nativeElement.scrollHeight;
    } catch(err) { }
  }

  updateImg(character: Character) {
    if (character?.characterRol) {
      let img: HTMLInputElement = document.querySelector('#update-img');
      let route: string = "http://localhost:8090/character/uploads/img/";
      img.src = route + character.characterRol.characterRolName.toLowerCase() + ".png";
    }
    //this.userPlayer2 = character.user.userName;
    //console.log("User Player 2: " + this.userPlayer2);
  }

  updateUserPlayer2(character: Character): void {
    this.userPlayer2 = character.user.userName + " -";
  }

  loadCharacter(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.characterService.getCharacter(id).subscribe((character1) => this.character1 = character1);
      }
    })
  }

  public compareCharacters(o1: Character, o2: Character): boolean {
    return o1 == null || o2 == null ? false : o1.name == o2.name;
  }

  luchar() {
    this.globalService.playAudioClick();
    this.battle.fight(this.character1, this.character2).subscribe(
      param => {
        this.fight = param;
        this.winner = param.winner;
        this.fasterCharacter = param.faster;

        if(this.fasterCharacter.name === this.character1.name){

          this.character1First = true;
        }

        if(this.fasterCharacter.name === this.character2.name){

          this.character1First = false;

        }

        if(this.winner.name === this.character1.name){
          this.player2Dead = true;
          this.globalService.playAudioWin();
        }

        if(this.winner.name === this.character2.name){
          this.player1Dead = true;
          this.globalService.playAudioLoose();
        }

        this.movesPlayer1 = param.movesPlayer1; //jugador 1
        this.movesPlayer2 = param.movesPlayer2; //jugador 2
        this.allMoves = param.allMoves; //todos los movimientos

        Swal.fire(
          {
            icon: "success",
            title: `El ganador es ${this.winner.name}`,
            text: `¡${this.winner.name} ha machacado a su contrincante!`
          }
        )
      }
    )

  }

  controlLucha(moveUser: Skill) {

      this.battle.controlFight(this.character1, this.character2,  moveUser, this.player1HP, this.player2HP, this.cont).subscribe(
        param => {

          //Si alguno de los jugadores tiene 0 puntos de vida
          if(param.hp1 <= 0 || param.hp2 <= 0 ){

            if(param.hp1 <= 0){

              this.player1Dead = true;
              this.globalService.playAudioLoose();
              this.player2HP = param.hp2;
              this.player1HP = 0;
              Swal.fire(
                {
                  icon: "success",
                  title: `El ganador es ${this.character2.name}`,
                  text: `¡${this.character2.name} ha machacado a su contrincante!`
                }
              )

            }

            if(param.hp2 <= 0){

              this.player2Dead = true;
              this.globalService.playAudioWin();
              this.player1HP = param.hp1;
              this.player2HP = 0;
              Swal.fire(
                {
                  icon: "success",
                  title: `El ganador es ${this.character1.name}`,
                  text: `¡${this.character1.name} ha machacado a su contrincante!`
                }
              )

            }
          }

          //Si ambos tienen mas de 0 puntos de vida
          else{
            this.moveControlFight = {"i" : this.cont,"movePlayer1": moveUser, "movePlayer2": param.moveOpponent};
            this.moveUser1 = moveUser;
            this.fight = param;
            this.fight.moveOpponent = param.moveOpponent;
            this.fight.hp1 = param.hp1;
            this.fight.hp2 = param.hp2;

            this.player1HP = param.hp1;
            this.player2HP = param.hp2;

            if(this.moveControlFight){
              this.movesControlFight.push(this.moveControlFight);
            }

            //Al perder receteamos los valores
            if(this.player1HP <= 0 || this.player2HP <= 0){
              //this.moveUser1 = null;
            }


          }}
        )
        this.moveUser1 = moveUser;
        this.cont++;

  }

  cleanMoves2(){
    this.moveUser1 = null;
    this.cont = 0;
    this.movesControlFight = [];
    this.player1Dead = false;
    this.player2Dead = false;
  }

  cleanMoves(){
    this.movesPlayer1 = null;
    this.movesPlayer2 = null;
    this.player1Dead = false;
    this.player2Dead = false;
  }

  check(){

    if(this.character1 == null || this.character2 == null || this.character1.hp <= 0 || this.character2.hp <= 0){

      //Cuando alguno de los jugadores aún no ha sido seleccionado
      if(this.character1 == null || this.character2 == null){
        Swal.fire({
          icon: "error",
          title: "¡Alto ahí!",
          text: "Primero debes elegir un adversario."
        })
      }

      //Cuando alguno de los jugaadores seleccionados tiene 0 puntos de vida
      if(this.character1?.hp <= 0 || this.character2?.hp <= 0){

        if(this.character1.hp <= 0){
          Swal.fire({
            icon: "warning",
            title: "¡Cuidado!",
            text: `No te quedan quedan puntos de vida`
          })
        }

        if(this.character2.hp <= 0){
          Swal.fire({
            icon: "warning",
            title: "¡Cuidado!",
            text: `A tu adversario ${this.character2.name} no le quedan puntos de vida`
          })
        }

      }


    }

    else{
      this.globalService.playAudioClick();
      this.chooseMode = true;
    }

  }

  activeManualFight(){
    if(this.character1 == null || this.character2 == null){

      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Debe elegir un adversario."
      })

    }
    else{
      this.globalService.playAudioClick();
      this.player1HP = this.character1.hp;
      this.player2HP = this.character2.hp;
      this.manualFight = true;
    }
  }

}
