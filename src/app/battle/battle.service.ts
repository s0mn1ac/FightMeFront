import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Fight } from './fight';
import { Skill } from '../skill/skill';
import { ManualFight } from './manual-fight';


@Injectable({ providedIn: 'root' })
export class BattleService {

  private urlEndPoint: string = 'http://localhost:8090/fight';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public validaciones: string[];

  public mFight: ManualFight = new ManualFight; 

  newHP1: number;
  newHP2: number;

  constructor(private http: HttpClient, private router: Router, public authService: AuthService) { }

  private addHeaderAuthorization() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isAuthorized(e): boolean {

    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      this.router.navigate(['/userinterface']);
      Swal.fire('Acceso denegado', 'Este apartado solamente está disponible para administradores', 'warning');
      return true;
    }

    return false;

  }

  //Modificar un personaje
  fight(character1: Character, character2: Character): Observable<Fight> {

    if (character1 == null || character2 == null) {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Debe elegir a un adversario."
      })
    }

    else{

      let characters: Character[] = [character1, character2];
      return this.http.put<Fight>(`${this.urlEndPoint}`, characters, { headers: this.addHeaderAuthorization() }).pipe(
        catchError(e => {
          if (this.isAuthorized(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      )

    }
  }

    //Batalla manual
    controlFight(character1: Character, character2: Character, move: Skill, HP1: number, HP2: number, cont: number): Observable<Fight> {

        this.mFight.user = character1;
        this.mFight.opponent = character2
        this.mFight.moveUser = move;

        if(cont <= 1){
          this.mFight.newHP1 = character1.hp;
          this.mFight.newHP2 = character2.hp;
        }

        else{
          this.mFight.newHP1 = HP1;
          this.mFight.newHP2 = HP2;
        }

        if((HP1 <= 0) && cont > 1){
          Swal.fire(
            {
              icon: "success",
              title: `El ganador es ${character2.name}`,
              text: `¡${character2.name} ha machacado a su contrincante!`
            }
          )
        }

        if((HP2 <= 0)  && cont > 1){
          Swal.fire(
            {
              icon: "success",
              title: `El ganador es ${character1.name}`,
              text: `¡${character1.name} ha machacado a su contrincante!`
            }
          )
        
    }

      
       
         return this.http.put<Fight>(`${this.urlEndPoint}/control`, this.mFight,  { headers: this.addHeaderAuthorization() }).pipe(  
          catchError(e => {
            if (this.isAuthorized(e)) {
              return throwError(e);
            }
            return throwError(e);
          })
        )
        
      
    }
}