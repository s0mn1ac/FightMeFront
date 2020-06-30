import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Credentials } from './credentials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _credentials: Credentials;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get credentials(): Credentials {
    if(this._credentials != null) {
      return this._credentials;
    } else if(this._credentials == null && sessionStorage.getItem('user') != null) {
      this._credentials = JSON.parse(sessionStorage.getItem('user')) as Credentials;
      return this._credentials;
    }
    return new Credentials();
  }

  public get token(): string {
    if(this._token != null) {
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(credentials: Credentials): Observable<any> {

    const url = 'http://localhost:8090/oauth/token';
    const cred = btoa('fightme' + ':' + 'fightme');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + cred});
    
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', credentials.username);
    params.set('password', credentials.password);

    return this.http.post(url, params.toString(), {headers: httpHeaders});

  }

  logout(): void {
    this._token = null;
    this._credentials = null;
    sessionStorage.clear();
  }

  saveUser(accessToken: string): void {
    let payload = this.extractToken(accessToken);
    this._credentials = new Credentials();
    this._credentials.name = payload.name;
    this._credentials.username = payload.user_name;
    this._credentials.roles = payload.authorities;
    this._credentials.characters = payload.characters;
    sessionStorage.setItem('user', JSON.stringify(this._credentials));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  extractToken(accessToken: string): any {
    if(accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    
    let payload = this.extractToken(this.token);
    
    if(payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }

    return false;

  }

  hasRole(role: string): boolean {
    if(this.credentials.roles.includes(role)) {
      return true;
    }
    return false;
  }

  hasCharacters(): boolean {
    if (this.credentials.characters.length > 0) {
      return true;
    }
    return false;
  }

}
