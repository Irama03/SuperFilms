import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/services/filter.service";
import {Game, GamesService} from "../shared/services/games.service";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  toggle = true;
  findForm: FormGroup = new FormGroup({});
  filterForm: FormGroup = new FormGroup({});

  constructor(public filterService: FilterService, public gamesService: GamesService/*, public authService: AuthService*/) { }

  ngOnInit(): void {
    this.findForm = new FormGroup({findStr: new FormControl('')})
    this.filterForm = new FormGroup({
      priceRange: new FormControl(0),
      indie: new FormControl(false),
      action: new FormControl(false),
      adventure: new FormControl(false)
    });
  }

  toggleCards(){
    this.toggle = !this.toggle;
  }

  // dir - direction - направление
  go(dir: number) {
    this.filterService.changeSomeString(dir);
  }

  find() {
    const {findStr} = this.findForm.value;
    const findStr0 = findStr.trim().toLowerCase();
    this.gamesService.filters.findStr = findStr0;
    if (findStr0.length !== 0)
      this.gamesService.filters.findApplied = true;
    else this.gamesService.filters.findApplied = false;
    this.filterChanged();
  }

  filtersNotApplied() {
    return this.gamesService.filters.priceChosen === 0 && this.gamesService.filters.filtersChosen.length === 0;
  }

  priceRangeChanged() {
    const {priceRange} = this.filterForm.value;
    this.gamesService.filters.priceChosen = priceRange;
    if (this.filtersNotApplied())
      this.gamesService.filters.filterApplied = false;
    else if (priceRange > 0) this.gamesService.filters.filterApplied = true;
    this.filterChanged();
  }

  indieChanged() {
    const {indie} = this.filterForm.value;
    if (!indie){ // @ts-ignore
      this.gamesService.filters.filtersChosen.splice(this.gamesService.filters.filtersChosen.indexOf('Indie'), 1);
      if (this.filtersNotApplied())
        this.gamesService.filters.filterApplied = false;
    }
    else { // @ts-ignore
      this.gamesService.filters.filtersChosen.push('Indie');
      this.gamesService.filters.filterApplied = true;
    }
    this.filterChanged();
  }

  actionChanged() {
    const {action} = this.filterForm.value;
    if (!action){ // @ts-ignore
      this.gamesService.filters.filtersChosen.splice(this.gamesService.filters.filtersChosen.indexOf('Action'), 1);
      if (this.filtersNotApplied())
        this.gamesService.filters.filterApplied = false;
    }
    else { // @ts-ignore
      this.gamesService.filters.filtersChosen.push('Action');
      this.gamesService.filters.filterApplied = true;
    }
    this.filterChanged();
  }

  adventureChanged() {
    const {adventure} = this.filterForm.value;
    if (!adventure){ // @ts-ignore
      this.gamesService.filters.filtersChosen.splice(this.gamesService.filters.filtersChosen.indexOf('Adventure'), 1);
      if (this.filtersNotApplied())
        this.gamesService.filters.filterApplied = false;
    }
    else { // @ts-ignore
      this.gamesService.filters.filtersChosen.push('Adventure');
      this.gamesService.filters.filterApplied = true;
    }
    this.filterChanged();
  }

  filterChanged(): void {
    const filters = this.gamesService.filters;
    this.gamesService.games = [];
    for (const game of this.gamesService.initialGames) {
      let suites: boolean = true;
      if (filters.findApplied) {
        if (!game.name.toLowerCase().includes(filters.findStr) && !game.description.toLowerCase().includes(filters.findStr)) {
          suites = false;
          continue;
        }
      }
      if (filters.filterApplied) {
        if (filters.priceChosen !== 0) {
          if (game.price > filters.priceChosen) {
            suites = false;
            continue;
          }
        }
        if (filters.filtersChosen.length === 0) {
          suites = true;
        }
        // @ts-ignore
        else if (!filters.filtersChosen.includes(game.tag)) {
          suites = false;
        }
      }
      if (suites)
        this.gamesService.games.push(game);
      else {
        console.log(game.name + ': ' + game.tag);
      }
    }
  }
}
