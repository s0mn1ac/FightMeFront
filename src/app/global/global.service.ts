import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class GlobalService {

  public soundOn: boolean = false;
  public audioMouseOver = new Audio();
  public audioClick = new Audio();
  public audioQuack = new Audio();

  public youWin = new Audio();
  public youLoose = new Audio();


  constructor() { }

  activeSound(){
    this.soundOn = true;
    this.loadAudio();
  }

  desactiveSound(){
    this.soundOn = false;
  }

  loadAudio(){
    this.audioMouseOver.src = "/assets/mp3/rollover.mp3";
    this.audioMouseOver.load();

    this.audioClick.src = "/assets/mp3/clickhard.mp3";
    this.audioClick.load();

    this.youWin.src = "/assets/mp3/youwin.mp3";
    this.youLoose.src = "/assets/mp3/youloose.mp3";

    this.audioQuack.src = "/assets/mp3/quack.mp3";
  }

	playAudio(){
    if(this.soundOn){
    this.audioMouseOver.play();
    }
  }

  playAudioClick(){
    if(this.soundOn){
    this.audioClick.play();
    }
  }

  playAudioWin(){
    if(this.soundOn){
      this.youWin.play();
      }
  }

  playAudioLoose(){
    if(this.soundOn){
      this.youLoose.play();
      }
  }

  playAudioQuack(){
  if(this.soundOn){
    this.audioQuack.play();
    }
  }

/*   autoPlayTables(){
    let soundElements = document.getElementsByTagName('tr');
    for(let i = 0; i< soundElements.length; i++){
        soundElements[i].  addEventListener('mouseover', (event) => {
        event.preventDefault();
        event.stopPropagation(); //en principio evita la propagacion del evento a las clases hijas
        this.playAudio();
      });
    }    
    console.log(soundElements.length);
  } */

}
