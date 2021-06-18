import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public term: string = '';
  public heroes: Hero[] = [];
  public selectedHero: Hero | undefined;

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  public searching(): void {
    this.heroService.getSuggetions(this.term.trim())
      .subscribe((heroes: Hero[]) => this.heroes = heroes);
  }

  public selectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.term = hero.superhero;

    this.heroService.getHero(hero.id!)
      .subscribe((hero: Hero) => this.selectedHero = hero);
  }

}
