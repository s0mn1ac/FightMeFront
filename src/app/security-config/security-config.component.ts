import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-security-config',
  templateUrl: './security-config.component.html',
  styleUrls: ['./security-config.component.css']
})
export class SecurityConfigComponent implements OnInit, CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    let allow: boolean = false;

    if (this.authService.hasRole("ROLE_ADMIN")) {
      allow = true;
      return allow;
    }
    else {
      Swal.fire(
        {
          icon: "error",
          title: "Ocurrió un error",
          text: "No tienes permiso para acceder a esta página"
        }
      )
      this.router.navigate(["/home"])
      //throw new Error("Method not implemented.");
    }
  }

  ngOnInit(): void {
  }

}
