import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/services/filter.service";
import {Game, GamesService} from "../shared/services/games.service";
import {AuthService} from "../shared/services/auth.service";
import {ConnectionsService} from "../shared/services/connections.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public gamesInLibrary: Game[] = [];

  //constructor(private filterService: FilterService) { }
  constructor(private http: HttpClient, public filterService: FilterService, public gamesService: GamesService, public connectionService: ConnectionsService) {

  }

  ngOnInit(): void {
    //this.connectionService.connection.subscribe(this.gamesService.fillGamesInLibrary.bind(this.connectionService.connection));
    this.connectionService.connection.subscribe(this.generate.bind(this));
    //this.filterService.someString.subscribe(this.generate.bind(this))
  }

  generate(value: any) {
    console.log(value);
    this.load().subscribe(games => {
      for (const game of games) {
        //console.log("G: " + game.id);
        //@ts-ignore
        if (value.games.includes(game.id)) {
          console.log("push");
          this.gamesInLibrary.push(game);
        }
      }
      //this.gamesInLibrary = gamesInLibrary;

    })
    //console.log(this.gamesService.games);
    //this.gamesService.fillGamesInLibrary(value);
  }

  load(): Observable<Game[]> {
    return this.http
      .get<Game[]>(`${GamesService.url}.json`)
      .pipe(map(games => {
        if (!games) {
          return [];
        }
        // @ts-ignore
        return Object.keys(games).map(key => ({...games[key], id: key}))
      }))
  }

}
