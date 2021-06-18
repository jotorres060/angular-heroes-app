import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      border-radius: 5px;
      width: 100%;
    }
  `]
})
export class AddComponent implements OnInit {

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  public hero: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.actRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHero(id))
      )
      .subscribe((hero: Hero) => this.hero = hero);
  }

  public save(): void {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }

    if (this.hero.id) {
      this.heroesService.updateHero(this.hero)
        .subscribe((hero: Hero) => this.showSnackbar('Hero updated!'));
    } else {
      this.heroesService.storeHero(this.hero)
        .subscribe((hero: Hero) => {
          this.router.navigate(['/heroes/edit', hero.id])
          this.showSnackbar('Register stored!');
        });
    }
  }

  public delete(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.hero
    });

    dialog.afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.heroesService.deleteHero(this.hero.id!)
            .subscribe(() => {
              this.router.navigate(['/heroes']);
            });
        }
      });
  }

  public showSnackbar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2500
    });
  }

}
