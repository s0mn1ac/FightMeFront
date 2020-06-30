import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Injectable({ providedIn: 'root' })
export class UserInterfaceService {

    constructor(public authService: AuthService) { }

}