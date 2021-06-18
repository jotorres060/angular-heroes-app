import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
    img {
      border-radius: 5px;
      width: 100%;
    }
  `]
})
export class HeroComponent implements OnInit {

  public hero!: Hero;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroesService
  ) { }

  ngOnInit(): void {
    this.actRoute.params
      .pipe(
        switchMap(({ id }) => this.heroService.getHero(id))
      )
      .subscribe((hero: Hero) => this.hero = hero);
  }

  public back(): void {
    this.router.navigate(['/heroes/list']);
  }

}
