import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { GlobalService } from '../global/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassField } from '@angular/compiler';
import Swal from 'sweetalert2';
import { User } from './user';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  private selectedFile: File;
  public user: User = new User();
  public fileName: String = 'Seleccione una imagen...';
  private fileSize: number = 0;
  private fileType: String;
  public faceIdChecked: boolean = false;
  public progress: number = 0;


  constructor(public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public globalService: GlobalService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  //Buscar usuario por id
  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      let idUser = params['idUser'];
      if (idUser) {
        this.userService.getUser(idUser).subscribe((user) => {
          this.user = user;
        });
      }
    })
  }

  return(): void {
    this.globalService.playAudioClick();
    this.router.navigate(['/users/page/0']);
  }

  selectFile(event){
    this.fileSize = (<HTMLInputElement>document.getElementById('inputFile')).files[0].size;
    this.fileType = (<HTMLInputElement>document.getElementById('inputFile')).files[0].type;

    if(this.fileSize > 10000000){
      Swal.fire('Error en subida', 'La imagen no debe superar los 10MB', 'error');
      return null;
    }

    if(this.fileType != "image/jpeg" && this.fileType != "image/png" && this.fileType != "image/jpeg"){
      Swal.fire('Error en subida', 'Formato inválido. Use solo .jpg, .jpeg y .png', 'error');
      return null;
    }
    
    this.selectedFile = event.target.files[0];
    this.fileName = (<HTMLInputElement>document.getElementById('inputFile')).files[0].name;
  }

  isFaceIdChecked(){
    if(!this.selectedFile) {
      Swal.fire('Error en subida', 'Debes seleccionar una imagen.', 'error');
      return null;
    }

    this.faceIdChecked =(<HTMLInputElement>document.getElementById("myCheck")).checked;
    
    if(!this.faceIdChecked){
      Swal.fire('Falta confirmación', 'Debe habiliatar el reconocimiento facial.', 'error');
    }
    else{
      this.uploadImage();
    }
  }

  uploadImage() {

    if(!this.selectedFile) {
      Swal.fire('¡Alto ahí!', 'Primero debes seleccionar una foto.', 'error');
    } else {
      this.userService.uploadImage(this.selectedFile, this.user.idUser).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded/event.total)*100);
          } else if(event.type === HttpEventType.Response) {
            Swal.fire('Subida completada', '¡La foto se ha subido con éxito!', 'success');
            this.progress = 0;
          }
      })
    }

  }
  /*
  subirFoto() {
    if(!this.selectImg) {
      swal.fire('Error en subida', 'Debes seleccionar una foto.', 'error');
    } else {
      this.desarrolladoraService.uploadImg(this.imgSelected, this.desarrolladora.id).subscribe(
      event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded/event.total)*100);
        } else if(event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.desarrolladora = response as Desarrolladora;
          this.dmodalService.notifyUploadD.emit(this.desarrolladora);
          swal.fire('Subida completada', '¡La foto se ha subido con éxito!', 'success');
        }
      })
    }
  }
  */
  enableFaceId(): void {    
    this.userService.enableFaceId(this.user.idUser).subscribe(
      user => {
        this.user = user;
        Swal.fire('FaceId habilitado', `¡El reconocimiento facial se ha habilitado correctamente!`, 'success');
      }
    )
  }

  disableFaceId(): void {
    this.userService.disableFaceId(this.user.idUser).subscribe(
      user => {
        this.user = user;
        Swal.fire('FaceId deshabilitado', `¡El reconocimiento facial ha sido deshabilitado!`, 'success');
      }
    )
  }

}
