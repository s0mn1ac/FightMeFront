import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Skill } from './skill';

@Injectable({providedIn: 'root'})
export class SkillService {

  private urlEndPoint: string = 'http://localhost:8090/skill';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public validaciones: string[];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private addHeaderAuthorization() {
    let token = this.authService.token;
    if(token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isAuthorized(e): boolean {

    if(e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status == 403) {
      this.router.navigate(['/userinterface']);
      swal.fire('Acceso denegado', 'Este apartado solamente está disponible para administradores', 'warning');
      return true;
    }

    return false;

  }

    //Listar habilidades
    getSkills(): Observable<Skill[]> {
      return this.http.get<Skill[]>(this.urlEndPoint, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      )
    };

    //Listar habilidades con paginación
    getSkillsPerPage(page: number): Observable<any> {
      return this.http.get<Skill[]>(this.urlEndPoint + '/page/' + page, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
        }),
        map(
          (response: any) => {
            (response.content as Skill[]).map(skill => {
              return skill;
            });
            return response;
          }
        )
      );
    }
  
    //Añadir habilidad
    addSkill(skill: Skill): Observable<Skill> {
      return this.http.post<Skill>(this.urlEndPoint, skill, {headers: this.addHeaderAuthorization()}).pipe(
        catchError((e) => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          console.error(e);
          //this.validaciones = e.error.valids;
          swal.fire('Error al crear habilidad', e.error.message, 'error');
          return throwError(e)
        })
      );
    }
  
    //Encontrar una habilidad por id
    getSkill(idSkill: number): Observable<Skill> {
      return this.http.get<Skill>(`${this.urlEndPoint}/${idSkill}`, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          this.router.navigate(['/skill']);
          console.error(e.error.message);
          swal.fire('Error al editar', e.error.message, 'error');
          return throwError(e);
        })
      );
    }
  
    //Modificar una habilidad
    modifySkill(skill: Skill): Observable<Skill> {
      return this.http.put<Skill>(`${this.urlEndPoint}/${skill.idSkill}`, skill, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          console.error(e.error.message);
          console.error(e.error.valids);
          this.validaciones = e.error.valids;
          swal.fire('Error al editar habilidad', e.error.message, 'error');
          return throwError(e)
        })
      );
    }
  
    //Eliminar habilidad
    deleteSkill(idSkill: number): Observable<Skill> {
      return this.http.delete<Skill>(`${this.urlEndPoint}/${idSkill}`, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          console.error(e.message);
          swal.fire('Error al eliminar habilidad', e.error.message, 'error');
          return throwError(e)
        })
      );
    }

    //Filtrar habilidades por nombre
    getSkillbyName(name: string): Observable<Skill[]> {
      return this.http.get<Skill[]>(`${this.urlEndPoint}/page/:page/${name}`, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          this.router.navigate(['/skill']);
          console.error(e.error.message);
          swal.fire('Error al filtrar', e.error.message, 'error');
          return throwError(e);
        })
      );
    }
}
