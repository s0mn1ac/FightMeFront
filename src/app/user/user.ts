import { Rol } from './rol';
import { Character } from '../character/character';

export class User {

    idUser : number;
    userName : string;
    password : string;
    mail : string;
    name : string;
    birthdate : string;
    country : string;
    rol : Rol;
    //image: string;
    faceId: string;
}
