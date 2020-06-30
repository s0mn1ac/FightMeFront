import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CharacterRol } from './character-rol';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CharacterRolService {

  private urlEndPoint: string = "http://localhost:8090/characterRol"
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

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
  getCharactersRol(): Observable<CharacterRol[]> {
    return this.http.get<CharacterRol[]>(this.urlEndPoint, {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }
}
