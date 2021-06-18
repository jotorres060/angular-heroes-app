import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Hero } from '../interfaces/hero.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  public baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  public getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${id}`);
  }

  public getSuggetions(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ term }&_limit=6`);
  }

  public storeHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }

  public deleteHero(id: string): Observable<{}> {
    return this.http.delete<{}>(`${ this.baseUrl }/heroes/${ id }`);
  }
}
