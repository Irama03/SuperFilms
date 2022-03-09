import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GamesService} from "../shared/services/games.service";
import {Game} from "../shared/models/game";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required)
    });
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

}
