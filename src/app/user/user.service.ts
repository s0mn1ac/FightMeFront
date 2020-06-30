import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { User } from './user';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { Rol } from './rol';

@Injectable({ providedIn: 'root' })
export class UserService {

  private urlEndPoint: string = 'http://localhost:8090/user';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
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

  //Listar usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint, {headers: this.addHeaderAuthorization()}).pipe(
      map(response => {
        let users = response as User[];
        return users.map(user => {
          user.birthdate = formatDate(user.birthdate, 'dd/MM/yyyy', 'es');
          return user;
        })
      }),
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  };

  //Listar usuarios con paginación
  getUsersPerPage(page: number): Observable<any> {
    return this.http.get<User[]>(this.urlEndPoint + '/page/' + page, {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
      }),
      map(
        (response: any) => {
          (response.content as User[]).map(user => {
            return user;
          });
          return response;
        }
      )
    );
  }

  //Listar roles
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>('http://localhost:8090/roles', {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        this.isAuthorized(e);
        return throwError(e);
      })
    );
  }

  //Añadir user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlEndPoint, user, { headers: this.addHeaderAuthorization() }).pipe(
      catchError((e) => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        this.validaciones = e.error.valids;
        Swal.fire('Error al crear usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Encontrar un usuario por id
  getUser(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${idUser}`, { headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/user']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  //Encontrar un usuario por userName
  getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/checkUser/${userName}`, { headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        Swal.fire('Error al encontrar el usuario', e, 'error');
        return throwError(e);
      })
    );
  }

  //Modificar un usuario
  modifyUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlEndPoint}/${user.idUser}`, user, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        console.error(e.error.valids);
        this.validaciones = e.error.valids;
        Swal.fire('Error al editar usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Modificar un usuario (incluyendo su contraseña)
  modifyUserWithPassword(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlEndPoint}/password/${user.idUser}`, user, { headers: this.addHeaderAuthorization() } ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.error.message);
        console.error(e.error.valids);
        this.validaciones = e.error.valids;
        Swal.fire('Error al editar usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Eliminar usuario
  deleteUser(idUser: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndPoint}/${idUser}`, {headers: this.addHeaderAuthorization()} ).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        console.error(e.message);
        Swal.fire('Error al eliminar usuario', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  //Filtrar usuarios por nombre
  getUserbyName(userName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlEndPoint}/page/:page/${userName}`, {headers: this.addHeaderAuthorization()}).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/user']);
        console.error(e.error.message);
        swal.fire('Error al filtrar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

    //Subir Imagen
/*     uploadImage(file: File, id: number): Observable<User>{
      let formData = new FormData();
      formData.append("file", file);
      return this.http.post(`${this.urlEndPoint}/uploadform/${id}`, formData, {headers: this.addHeaderAuthorization()}).pipe(
        map((response: any) => response.user as User), //Revisar
        catchError(e => {
          if(this.isAuthorized(e)) {
            return throwError(e);
          }
          this.router.navigate(['/user']);
          console.error(e.error.message);
          swal.fire('Error al subir archivo', e.error.message, 'error');
          return throwError(e);
        })
      );

    } */

  uploadImage(file: File, id): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("file", file);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer' + token);
    }

    const req = new HttpRequest('POST', `http://localhost:8090/faceid/fill/${id}`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isAuthorized(e);
        return throwError(e);
      })
    );
    
  }

  // Habilita el soporte para reconocimiento facial
  enableFaceId(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8090/faceid/enable/${id}`, { headers: this.addHeaderAuthorization() }).pipe(
      catchError((e) => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        Swal.fire('Error al habilitar el reconocimiento facial', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

  // Deshabilita el soporte para reconocimiento facial
  disableFaceId(id: number): Observable<User> {
    return this.http.delete<User>(`http://localhost:8090/faceid/${id}`, { headers: this.addHeaderAuthorization() }).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        Swal.fire('Error al deshabilitar el reconocimiento facial', e.error.message, 'error');
        return throwError(e)
      })
    );
  }

}
