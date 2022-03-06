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
  filterForm: FormGroup = new FormGroup({});

  constructor(public filterService: FilterService, public gamesService: GamesService, public authService: AuthService) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      priceRange: new FormControl(0),
      indie: new FormControl(false),
      action: new FormControl(false),
      adventure: new FormControl(false)
    });
  }

  /*cards: Card[] = [
    {title: 'Card1', text: 'This is card 1'},
    {title: 'Card2', text: 'This is card 2'},
    {title: 'Card3', text: 'This is last card'}
  ]*/

  toggleCards(){
    this.toggle = !this.toggle;
  }

  // dir - direction - направление
  go(dir: number) {
    this.filterService.changeSomeString(dir);
  }

  priceRangeChanged() {
    const {priceRange} = this.filterForm.value;
    this.gamesService.filters.priceChosen = priceRange;
    this.filterChanged();
  }

  indieChanged() {
    const {indie} = this.filterForm.value;
    if (!indie){ // @ts-ignore
      this.gamesService.filters.filtersChosen.splice(this.gamesService.filters.filtersChosen.indexOf('indie'), 1);
    }
    else { // @ts-ignore
      this.gamesService.filters.filtersChosen.push('indie');
    }
    this.filterChanged();
  }

  actionChanged() {
    const {action} = this.filterForm.value;
    if (!action){ // @ts-ignore
      this.gamesService.filters.filtersChosen.splice(this.gamesService.filters.filtersChosen.indexOf('action'), 1);
    }
    else { // @ts-ignore
      this.gamesService.filters.filtersChosen.push('action');
    }
    this.filterChanged();
  }

  adventureChanged() {
    const {adventure} = this.filterForm.value;
    if (!adventure){ // @ts-ignore
      this.gamesService.filters.filtersChosen.splice(this.gamesService.filters.filtersChosen.indexOf('adventure'), 1);
    }
    else { // @ts-ignore
      this.gamesService.filters.filtersChosen.push('adventure');
    }
    this.filterChanged();
  }

  filterChanged(): void {
    const filters = this.gamesService.filters;
    this.gamesService.games = [];
    for (const game of this.gamesService.initialGames) {
      let suites: boolean = true;
      if (filters.findApplied) {
        const findStr0 = filters.findStr.trim().toLowerCase();
        if (!game.name.toLowerCase().includes(findStr0) || !game.description.toLowerCase().includes(findStr0)) {
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
    }
  }
}
