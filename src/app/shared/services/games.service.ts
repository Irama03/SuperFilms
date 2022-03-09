import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConnectionsService} from "./connections.service";
import {deepCopyFunction} from "../utils";
import {Game} from "../models/game";

export interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class GamesService {
  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/games';
  public initialGames: Game[] = [];
  public games: Game[] = [];
  public gamesInLibrary: Game[] = [];

  public filters = {
    findApplied: false,
    findStr: '',
    filterApplied: false,
    priceChosen: 0,
    filtersChosen: []
  }

  constructor(public connectionsService: ConnectionsService) {
    this.load().subscribe(games => {
      let gamesInLibrary;
      if (connectionsService.connection.value === undefined) {
        connectionsService.load().subscribe(connections => {
          for (const con of connections) {
            if (con.userId == connectionsService.authService.userData.uid) {
              console.log("Got connection in games");
              connectionsService.connection.next(con);
              gamesInLibrary = connectionsService.connection.value.games;
              console.log("gamesInLibrary load: " + gamesInLibrary.length + " " + gamesInLibrary);
              for (const game of games) {
                console.log("G: " + game.id);
                //@ts-ignore
                if (gamesInLibrary.includes(game.id)) {
                  console.log("push");
                  this.gamesInLibrary.push(game);
                }
                else this.initialGames.push(game);
              }
              this.games = deepCopyFunction(this.initialGames);
              break;
            }
          }
        })
      }
      else {
        gamesInLibrary = connectionsService.connection.value.games;
        console.log("gamesInLibrary: " + gamesInLibrary.length + " " + gamesInLibrary);
        for (const game of games) {
          console.log("G: " + game.id);
          //@ts-ignore
          if (gamesInLibrary.includes(game.id)) {
            console.log("push");
            this.gamesInLibrary.push(game);
          }
          else this.initialGames.push(game);
        }
        this.games = deepCopyFunction(this.initialGames);
      }

    })
  }

  load(): Observable<Game[]> {
    return this.connectionsService.http
      .get<Game[]>(`${GamesService.url}.json`)
      .pipe(map(games => {
        if (!games) {
          return [];
        }
        // @ts-ignore
        return Object.keys(games).map(key => ({...games[key], id: key}))
      }))
  }

  create(game: Game): Observable<Game> {
    return this.connectionsService.http
      .post<CreateResponse>(`${GamesService.url}.json`, game)
      .pipe(map(res => {
        return {...game, id: res.name}
      }))
  }

  remove(game: Game): Observable<void> {
    return this.connectionsService.http
      .delete<void>(`${GamesService.url}/${game.id}.json`)
  }

}
