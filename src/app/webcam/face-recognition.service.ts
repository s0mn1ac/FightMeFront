import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Face } from './face';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {

  private urlEndPoint: string = 'http://localhost:8090/faceid';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

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

  // Verifica si una imagen pasada por parámetro corresponde a x usuario
  facialRecognition(username: string, image: string): Observable<Face> {

    return this.http.post<Face>(`${this.urlEndPoint}/${username}`, image, { headers: this.addHeaderAuthorization() }).pipe(
      catchError(e => {
        if(this.isAuthorized(e)) {
          return throwError(e);
        }
        swal.fire('Error al procesar la imagen', e.error.message, 'error');
        return throwError(e)
      })
    );
  }
  
}
