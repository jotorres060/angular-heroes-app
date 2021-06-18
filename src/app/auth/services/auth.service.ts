import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  get auth(): Auth {
    return {...this._auth!}
  }

  public checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        map((auth) => {
          this._auth = auth;
          return true;
        })
      );
  }

  public login(): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        tap((auth) => this._auth = auth),
        tap((auth) => localStorage.setItem('token', auth.id))
      );
  }

  public logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
  }

}
