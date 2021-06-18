import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe((resp: Hero[]) => this.heroes = resp);
  }

}
