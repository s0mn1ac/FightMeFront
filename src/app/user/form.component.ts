import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { User } from './user';
import { UserService } from './user.service';
import { Rol } from './rol';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public user: User = new User();
  public validadores: string[];
  public roles: Rol[];
  public paises: string[] = [
    "Abjasia",
    "Afghanistan",
    "Aland",
    "Albania",
    "Alemania",
    "algeria",
    "Andorra",
    "Angola",
    "Anguila",
    "Antigua y Barbuda",
    "Arabia Saudi",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaiyan",
    "Bahamas",
    "Bangladesh",
    "Barbados",
    "Barein",
    "Bélgica",
    "Belice",
    "Benin",
    "Bermuda",
    "Bielorrusia",
    "Birmania",
    "Bolivia",
    "Bonaire",
    "Bosnia y Herzegovina",
    "Botswana",
    "Brasil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Butan",
    "Cabo Verde",
    "Camboya",
    "Camerún",
    "Canadá",
    "Ceuta",
    "Chad",
    "Chile",
    "China",
    "Ciudad del Vaticano",
    "Colombia",
    "Columbia Britanica",
    "Comoras",
    "Córcega",
    "Corea del Norte",
    "Corea del Sur",
    "Costa de Marfil",
    "Costa Rica",
    "Croacia",
    "Cuba",
    "Curazao",
    "Dinamarca",
    "Dominica",
    "Ecuador",
    "Egipto",
    "El Salvador",
    "Emiratos Árabes Unidos",
    "Eritrea",
    "Escocia",
    "Eslovaquia",
    "Eslovenia",
    "España",
    "Estados Unidos",
    "Estonia",
    "Esuatini",
    "Etiopia",
    "Filipinas",
    "Finlandia",
    "Fiyi",
    "Francia",
    "Gabon",
    "Gales",
    "Gambia",
    "Georgia",
    "Ghana",
    "Gibraltar",
    "Granada",
    "Grecia",
    "Groenlandia",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea Ecuatorial",
    "Guinea-Bisau",
    "Guinea",
    "Haiti",
    "Hawai",
    "Holanda",
    "Honduras",
    "Hong Kong",
    "Hungría",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Irlanda",
    "Isla de Manvg",
    "Isla de Navidad",
    "Isla de Pascua",
    "Isla de Saba",
    "Isla del Coco",
    "Isla Norfolk",
    "Islandia",
    "Islas Azores",
    "Islas Baleares",
    "Islas Caimán",
    "Islas Canarias",
    "Islas Cook",
    "Islas Galápagos",
    "Islas Malvinas",
    "Islas Marianas del Norte",
    "Islas Marshall",
    "Islas Pitcairn",
    "Islas Solomon",
    "Islas Turcas y Caicos",
    "Islas Vírgenes Britanicas",
    "Islas Vírgenes",
    "Italia",
    "Jamaica",
    "Japón",
    "Jersey",
    "Jordan",
    "Kazajistan",
    "Kenia",
    "Kirguistan",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Laos",
    "Lesoto",
    "Letonia",
    "Libano",
    "Liberia",
    "Libia",
    "Liechtenstein",
    "Lituania",
    "Luxemburgo",
    "Macao",
    "Macedonia",
    "Madagascar",
    "Madeira",
    "Malasia",
    "Malaui",
    "Maldivas",
    "Mali",
    "Malta",
    "Marruecos",
    "Martinica",
    "Mauricio",
    "Mauritania",
    "Melilla",
    "Mexico",
    "Micronesia",
    "Moldavia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Mozambique",
    "Namibia",
    "Nato",
    "Nauru",
    "Nepal",
    "Nicaragua",
    "Níger",
    "Nigeria",
    "Niue",
    "Noriega",
    "Norte de Chipre",
    "Nueva Zelanda",
    "Oman",
    "Osetia",
    "Pais Vasco",
    "Pakistan",
    "Palaos",
    "Palestina",
    "Panamá",
    "Papua Nueva Guinea",
    "Paraguay",
    "Perú",
    "Polinesia Francesa",
    "Polonia",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reino Unido",
    "República Arabe Saharaui Democratica",
    "República Centroafricana",
    "República Checa",
    "República Democratica del Congo",
    "República Dominicana",
    "Ruanda",
    "Rumania",
    "Rusia",
    "Samoa Americana",
    "Samoa",
    "San Bartolomé",
    "San Cristóbal y Nieves",
    "San Eustaquio",
    "San Marino",
    "San Vicente y las Granadinas",
    "Santa Lucía",
    "Santo Tomé y Príncipe",
    "Sardinia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sicilia",
    "Sierra Leona",
    "Singapur",
    "Sint Maarten",
    "Siria",
    "Somalia",
    "Somalilandia",
    "Sri Lanka",
    "Sudáfrica",
    "Sudan del Sur",
    "Sudan",
    "Suecia",
    "Suiza",
    "Surinam",
    "Tailandia",
    "Taiwan",
    "Tanzania",
    "Tayikistan",
    "Territorio Británico del Oceano Indico",
    "Tibet",
    "Timor Oriental",
    "Togo",
    "Tokelau",
    "Tonga",
    "Transnistria",
    "Trinidad y Tobago",
    "Tunez",
    "Turkmenistan",
    "Turquia",
    "Tuvalu",
    "Ucrania",
    "Uganda",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Yibuti",
    "Zambia",
    "Zimbabwe"];
  
  public showEye: boolean;
  public toggler: boolean = true;

  constructor(public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public globalService: GlobalService) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadRoles();
  }

  //Añadir usuario
  public addUser(): void {
    this.userService.addUser(this.user).subscribe(
      user => {
        this.router.navigate(['/users/page/0'])
        swal.fire('Nuevo usuario', `Nuevo usuario creado con éxito!`, 'success');
      }
    )
  }

  //Buscar usuario por id
  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      let idUser = params['idUser']
      if (idUser) {
        this.userService.getUser(idUser).subscribe((user) => this.user = user)
      }
    })
  }

  private loadRoles(): void {
    this.userService.getRoles().subscribe(roles => this.roles = roles);
  }

  modifyUser(): void {
    this.userService.modifyUser(this.user).subscribe(
      user => {
        this.router.navigate(['/users/page/0'])
        swal.fire('Usuario Actualizado', `Usuario ${this.user.userName} actualizado con éxito`, 'success')
      }
    )
  }

  modifyUserWithPassword(): void {
    this.userService.modifyUserWithPassword(this.user).subscribe(
      user => {
        this.router.navigate(['/users/page/0'])
        swal.fire('Usuario Actualizado', `Usuario ${this.user.userName} actualizado con éxito`, 'success')
      }
    )
  }

  return(): void {
    this.globalService.playAudioClick();
    this.router.navigate(['/users/page/0']);
  }

  public compareRoles(o1: Rol, o2: Rol): boolean {
    return o1 == null || o2 == null ? false : o1.name == o2.name;
  }

  public comparePaises(o1: string, o2: string): boolean {
    return o1 == null || o2 == null ? false : o1 == o2;
  }

  /*
  togglePwd(): void {
    let inputNombre: HTMLInputElement = document.querySelector('#toggle');
    if(inputNombre.type == 'password') {
      inputNombre.type = 'text';
    } else {
      inputNombre.type = 'password';
    }
    this.showEye = !this.showEye;
  }
  */

  onCheck() {
    console.log(this.user)
  }

  //Sugerir correo en función del nombre de usuario
  suggestedEmail() {

    let email: HTMLInputElement = document.querySelector('#gmail');

    if(this.user.userName){
      email.value = `${this.user.userName.toLocaleLowerCase()}@gmail.com`;
      this.user.mail = `${this.user.userName.toLocaleLowerCase()}@gmail.com`;
    }

  }

  updatePasswordToggler():void {
    this.toggler = !this.toggler;
  }

}
