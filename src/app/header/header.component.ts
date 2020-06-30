import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title: string = 'FightMe!';
  audio = new Audio();
  //public soundOn: boolean = false;
  className: string = 'audio';

  constructor(public authService: AuthService, private router: Router, public globalService: GlobalService) { }


  ngOnInit(): void {this.loadAudio()}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    swal.fire('Cierre de sesión correcto', 'Has cerrado sesión correctamente', 'success');
  }

  loadAudio(){
    this.audio.src = "/assets/mp3/blup.mp3";
    this.audio.load();
  }

  autoPlay(){
    let soundElements = document.getElementsByClassName(this.className);
    for(let i = 0; i< soundElements.length; i++){
			  soundElements[i].addEventListener("click", (e:Event) => this.playAudio());
		}
  }

  playAudio(){
    if(this.globalService.soundOn){
      this.audio.play();
    }
  }

}