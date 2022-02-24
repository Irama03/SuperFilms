import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {Connection, ConnectionsService} from "./connections.service";
import {PeopleService} from "./people.service";

export interface Game {
  id?: string
  name: string,
  price: number,
  description: string,
  tag: string
}

export interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class GamesService {
  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/games';
  public games: Game[] = [];
  public gamesInLibrary: Game[] = [];

  constructor(private http: HttpClient) { //, private connectionsService: ConnectionsService) {
    this.load().subscribe(games => {
      this.games = games;
      /*const gamesInLibrary = connectionsService.connection.games;
      console.log("gamesInLibrary: " + gamesInLibrary.length + " " + gamesInLibrary);
      for (const game of games) {
        console.log("G: " + game.id);
        //@ts-ignore
        if (gamesInLibrary.includes(game.id)) {
          console.log("push");

          this.gamesInLibrary.push(game);
        }
      }*/
    })
  }

  fillGamesInLibrary(connection: Connection) {
    console.log("This: " + this);
    console.log("this.games: " + this.games);
    this.load().subscribe(games => {
      this.games = games;
      for (const game of this.games) {
        console.log("G: " + game.id);
        //@ts-ignore
        if (connection.games.includes(game.id)) {
          console.log("push");
          this.gamesInLibrary.push(game);
        }
      }
    })
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

  create(game: Game): Observable<Game> {
    return this.http
      .post<CreateResponse>(`${GamesService.url}.json`, game)
      .pipe(map(res => {
        return {...game, id: res.name}
      }))
  }

  remove(game: Game): Observable<void> {
    return this.http
      .delete<void>(`${GamesService.url}/${game.id}.json`)
  }

}
