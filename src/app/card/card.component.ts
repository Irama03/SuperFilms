import {Component, Input, OnInit} from "@angular/core";
import {GamesService} from "../shared/services/games.service";
import {Game} from "../shared/models/game";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  // @ts-ignore
  @Input() card: Game;
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
}
