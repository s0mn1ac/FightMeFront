import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Character } from './character';
import swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class CharacterService {

  private urlEndPoint: string = 'http://localhost:8090/character';
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

   //Listar personajes
   getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.urlEndPoint, {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  };

  //Listar personajes con paginación
  getCharactersPerPage(page: number): Observable<any> {
    return this.http.get<Character[]>(this.urlEndPoint + '/page/' + page, {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
      }),
      map(
        (response: any) => {
          (response.content as Character[]).map(character => {
            return character;
          });
          return response;
        }
      )
    );
  }

  //Añadir personaje
  addCharacter(character: Character): Observable<Character> {
    console.log(character);
    return this.http.post<Character>(this.urlEndPoint, character, { headers: this.addHeaderAuthorization() }).pipe(
      catchError((e) => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e);
        this.validaciones = e.error.valids;
        Swal.fire('Error al crear personaje', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un personaje por id
  getCharacter(id): Observable<Character> {
    return this.http.get<Character>(`${this.urlEndPoint}/${id}`, { headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/character']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  //Modificar un personaje
  modifyCharacter(character: Character): Observable<Character> {
    return this.http.put<Character>(`${this.urlEndPoint}/${character.idCharacter}`, character, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        console.error(e.error.valids);
        this.validaciones = e.error.valids;
        Swal.fire('Error al editar personaje', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar personaje
  deleteCharacter(id: number): Observable<Character> {
    return this.http.delete<Character>(`${this.urlEndPoint}/${id}`, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e);
        Swal.fire('Error al eliminar personaje', "Error", 'error');
        return throwError(e)
      })
    );
  }

    //Filtrar personajes por nombre
    getCharacterbyName(name: string): Observable<Character[]> {
      return this.http.get<Character[]>(`${this.urlEndPoint}/page/:page/${name}`, {headers: this.addHeaderAuthorization()}).pipe(
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          this.router.navigate(['/character']);
          console.error(e.error.message);
          swal.fire('Error al filtrar', e.error.message, 'error');
          return throwError(e);
        })
      );
    }
}
