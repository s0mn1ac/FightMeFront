import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import  swal  from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { GlobalService } from '../global/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  userPaginator: any;

  filterPost='';
  actualPage: number = 0;
  noResults: boolean = false;
  searched: string = '';

  constructor(private userService: UserService, public authService: AuthService,
              public globalService: GlobalService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsersPerPage();
  }

  //Borrar usuario
  deleteUser( user: User) :void{
    this.globalService.playAudioQuack();
    swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el usuario ${user.userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#DC3545',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.globalService.playAudioClick();
        this.userService.deleteUser(user.idUser).subscribe(
          response => {
            this.users = this.users.filter(us => us !== user)
            swal.fire(
              '¡Eliminado!',
              `El usuario ${user.userName} ha sido eliminado con éxito`,
              'success'
            )
          } 
        )
      }
      else
      this.globalService.playAudioClick();
    })
    
  }

  getUsersPerPage(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.actualPage = page;
      if(!page) {
        page = 0;
      }
      this.userService
        .getUsersPerPage(page)
        .subscribe(response => {
          this.users = response.content as User[];
          this.userPaginator = response;
        });
    });

  }

  findUserByName(userName: string): void {

    this.userService.getUserbyName(userName).subscribe (
      users => this.users = users
    );

    console.log("Número de coincidencia: " + this.users.length);

    if(!this.users.length){
      this.noResults = true;
      this.searched = userName;
      console.log(this.noResults);
    }
    
  }

  noFilter(): void {

    this.router.navigate(['/users/page/0']);
    this.filterPost = '';
    this.noResults = false;
    this.searched = '';
    this.getUsersPerPage();

  }
  
}


