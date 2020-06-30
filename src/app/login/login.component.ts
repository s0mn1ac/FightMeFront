import { Component, OnInit, NgZone } from '@angular/core';
import { Credentials } from './credentials';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor, inicie sesión';
  public username: string = 'admin';
  credentials: Credentials;
  faceId: boolean = false;
  swtchFrm = true;

  constructor(private authService: AuthService, private router: Router) { this.credentials = new Credentials(); }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      swal.fire('Oops', `Parece que ya estás autenticado, ${this.authService.credentials.name}`, 'info');
      this.router.navigate(['/userinterface']);
    }
  }

  login(): void {

    if(this.credentials.username == null || this.credentials.password == null) {
      swal.fire('Error al iniciar sesión', 'Los campos Usuario y Contraseña no pueden estar vacíos', 'error');
      return;
    }

    this.authService.login(this.credentials).subscribe(response => {

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      
      let user = this.authService.credentials;

      this.router.navigate(['/userinterface']);
      swal.fire('Inicio de sesión correcto', `¡Bienvenido, ${user.name}!`, 'success');

    }, e => {
      if(e.status == 400) {
        swal.fire('Error al iniciar sesión', 'El nombre de usuario o la contraseña no son correctos', 'error');
      }
    })

  }

  toggleLogin(){
    this.swtchFrm=!this.swtchFrm;
  }

}