import {Component, Input, OnInit} from "@angular/core";
import {Game, GamesService} from "../shared/services/games.service";
import {FilterService} from "../shared/services/filter.service";
import {Connection, ConnectionsService} from "../shared/services/connections.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  // @ts-ignore
  @Input() card: Game;
  // @ts-ignore
  @Input() index: number;
  @Input() main: boolean = true;

  constructor(public gamesService: GamesService) { }

  addToLibrary() {
    this.gamesService.initialGames.splice(this.gamesService.initialGames.indexOf(this.card), 1);
    //something strange
    this.gamesService.games.splice(this.gamesService.games.indexOf(this.card), 1);
    this.gamesService.gamesInLibrary.push(this.card);
    // @ts-ignore
    this.gamesService.connectionsService.updateGamesInLibrary(this.gamesService.gamesInLibrary.map(game => game.id));
    console.log("Added to library");
  }

  ngOnInit(): void {
  }

  //changeTitle() {
  //  this.title = 'Title has been changed!'
  //}

  /*inputHandler(event: any) {
    //console.log(event);
    const value = event.target.value;
    this.title = value;
  }*/

  //inputHandler(value: string) {
  //  this.title = value;
  //}
}
