import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/services/filter.service";
import {Game, GamesService} from "../shared/services/games.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(public filterService: FilterService, public gamesService: GamesService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  toggle = true;

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

}
