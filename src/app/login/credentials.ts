import { Character } from '../character/character';

export class Credentials {
    name: string;
    username: string;
    password: string;
    roles: string[] = [];
    characters: string[] = [];
}
