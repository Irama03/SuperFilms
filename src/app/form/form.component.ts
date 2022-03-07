import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/services/filter.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Game, GamesService} from "../shared/services/games.service";

//templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css']

@Component({
  selector: 'app-form',
  template: `
    <form (ngSubmit)="submit()" [formGroup]="form">
      <p class="fr">A form</p>
      <input type="text" formControlName="name">
      <p>Price</p>
      <input type="text" formControlName="price">
      <p>Description</p>
      <input type="text" formControlName="description">
      <input type="text" formControlName="tag">
      <button type="submit" class="btn btn-primary btn-block" [disabled]="form.invalid">Add</button>
    </form>
  `,
  styles: [
    `
      .fr{
        border: 1px solid orange;
      }
    `
  ]
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  //games: Game[] = [];

  constructor(private filterService: FilterService, private gamesService: GamesService) { }

  ngOnInit(): void {
    this.filterService.someString.subscribe(this.generate.bind(this));
    /*this.gamesService.load().subscribe(games => {
      this.games = games;
    })*/
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required)
    });
  }

  // викликається, коли someString змінює значення
  generate(value: any) {
    console.log(value);
  }

  submit() {
    const {name} = this.form.value;
    console.log(name);

    const {price} = this.form.value;
    const {description} = this.form.value;
    const {tag} = this.form.value;

    const game: Game = {
      name,
      price,
      description,
      tag
    }

    this.gamesService.create(game).subscribe(game => {
      this.gamesService.initialGames.push(game);
      this.form.reset();
    }, err => console.log(err));
  }

  /*remove(game : Game) {
    this.gamesService.remove(game).subscribe(() => {
      this.games = this.games.filter(g => g.id !== game.id)
    }, err => console.log(err));
  }*/

}
