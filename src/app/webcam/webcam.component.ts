import {Component, OnInit} from '@angular/core';
import { FaceRecognitionService } from './face-recognition.service';
import { Face } from './face';
import swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Credentials } from '../login/credentials';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  public video;
  public myCanvas;
  predictedAges = [];
  public promiseArray = [];
  public fapi = require('../../assets/js/face-api.min.js');

  public enableLogin: boolean;
  public closeInterval: boolean = false;

  public faceIdCanvas: HTMLCanvasElement;

  //@Input() username: string = "";

  credentials: Credentials;

  public constructor(private authService: AuthService, private router: Router, private faceRecognitionService: FaceRecognitionService) { this.credentials = new Credentials(); }

  public ngOnInit(): void {
    this.generatePromisesArray();
  }

  public generatePromisesArray() {

    const fapi = require('../../assets/js/face-api.min.js');

    Promise.all([fapi.nets.tinyFaceDetector.loadFromUri('../../assets/js/models'),
      fapi.nets.faceLandmark68Net.loadFromUri('../../assets/js/models'),
      fapi.nets.faceRecognitionNet.loadFromUri("../../assets/js/models"),
      fapi.nets.faceExpressionNet.loadFromUri("../../assets/js/models"),
      fapi.nets.ageGenderNet.loadFromUri("../../assets/js/models").then(this.startVideo())]);

  }

  public startVideo() {

    this.faceIdCanvas = document.getElementById("canvas") as HTMLCanvasElement;
    if(this.faceIdCanvas != null){
      document.getElementById("canvas").remove();
    }
    let video = document.getElementById("video") as HTMLVideoElement;
    this.video = video;
    navigator.getUserMedia({ video: {} }, stream => (this.video.srcObject = stream), err => console.error(err));
    this.mainFunction();

  }

  public mainFunction() {

    this.video.addEventListener('play', () => {
      const canvas = this.fapi.createCanvasFromMedia(this.video)
      //document.getElementById('divcanvas').removeChild(canvas);
      document.getElementById('divcanvas').appendChild(canvas);
      //document.body.append(canvas)
      const displaySize = { width: this.video.width, height: this.video.height }
      this.fapi.matchDimensions(canvas, displaySize)
      canvas.id = "canvas"
      let intervalo = setInterval(async () => {
        const detections = await this.fapi.detectAllFaces(this.video, new this.fapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        if (detections.length == 0) {
          this.enableLogin = false;
        } else {
          this.enableLogin = true;
        }
        if (this.closeInterval) {
          clearInterval(intervalo);
        }
        //console.log("Dentro");
        const resizedDetections = this.fapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        this.fapi.draw.drawDetections(canvas, resizedDetections);

      }, 100)
    })

  }

  public takeSnap(): void{

    this.myCanvas = this.fapi.createCanvasFromMedia(this.video);
    //console.log(this.myCanvas.toDataURL());
    //this.video.pause();
    this.triggerSnapshot(this.myCanvas.toDataURL());
    //Pasuamos el video en el momento que sacamaos la captura

  }

  public triggerSnapshot(base64Image: string): void {

    if(this.credentials.username == null) {
      swal.fire('Error al iniciar sesión', 'Debes indicar un nombre de usuario', 'error');
      //this.video.play();
      return;
    }

    this.faceRecognitionService.facialRecognition(this.credentials.username, base64Image).subscribe((response) => {

      if (response == null) {
        swal.fire('Error al iniciar sesión', 'El usuario indicado no está registrado en la base de datos o no tiene FaceId habilitado', 'error');
        //this.video.play();
        return;
      }

      let face = response as Face;

      if (face.personId == null) {
        swal.fire('Error al iniciar sesión', 'Tu cara no coincide con el usuario indicado', 'error');
        //this.video.play();
        return;
      } else {
        this.credentials.password = face.personId;
        this.closeInterval = true;
        this.authService.login(this.credentials).subscribe(response => {

          this.authService.saveUser(response.access_token);
          this.authService.saveToken(response.access_token);
          
          let user = this.authService.credentials;
          this.router.navigate(['/userinterface']);
          swal.fire('Inicio de sesión correcto', `¡Bienvenido, ${user.name}!`, 'success');

          this.video.srcObject.getVideoTracks()[0].stop();
    
        }, e => {
          if(e.status == 400) {
            swal.fire('Error al iniciar sesión', 'El FaceId no coincide con el usuario indicado', 'error');
            //this.video.play();
          }
        })
      }

    });
    
  }

}
