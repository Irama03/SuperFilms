import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CreateResponse, Game, GamesService} from "./games.service";
import {Person} from "./people.service";
import {AuthService} from "./auth.service";

export interface Connection {
  userId: string,
  games: string[],
  friends: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/connections';
  // @ts-ignore
  public connection: BehaviorSubject<Connection> = new BehaviorSubject<Connection>();
  //public connection: Connection;

  constructor(private http: HttpClient, private authService: AuthService) {//}, private gamesService: GamesService) {
    const userId = authService.userData.uid;
    console.log("AuthService in connection: " + userId);
    const games: string[] = [];
    const friends: string[] = [];
    /*const conn: Connection = {
      userId,
      games,
      friends
    };
    this.create(conn).subscribe((con) => this.connection = con);*/
    this.load().subscribe(connections => {
      //this.games = games;
      let found = false;
      for (const con of connections) {
        // @ts-ignore
        if (con.userId == userId) {
          console.log("Got connection");
          //this.connection = con;
          this.connection.next(con);
          found = true;

          /*for (const game of gamesService.games) {
            console.log("G: " + game.id);
            //@ts-ignore
            if (connection.games.includes(game.id)) {
              console.log("push");
              gamesService.gamesInLibrary.push(game);
            }
          }*/

          break;
        }
      }
      if (!found) {
        const conn: Connection = {
          userId,
          games,
          friends
        };
        this.create(conn).subscribe((con) => this.connection.next(con));
      }
    })
  }

  // або юзера передавати
  /*load(id: string): Observable<Connection> {
    // @ts-ignore
    return this.http.get<Connection>(`${ConnectionsService.url}.json`).pipe(connections => {
        if (!connections) {
          //return new Connection(id, [], []);
          return null;
        }
        return connections;
      });
  }*/

  load(): Observable<Connection[]> {
    return this.http
      .get<Connection[]>(`${ConnectionsService.url}.json`)
      .pipe(map(connections => {
        if (!connections) {
          return [];
        }
        // @ts-ignore
        return Object.keys(connections).map(key => ({...connections[key], id: key}))
      }))
  }

  create(connection: Connection): Observable<Connection> {
    return this.http
      .post<CreateResponse>(`${ConnectionsService.url}.json`, connection)
      .pipe(map(res => {
        return {...connection, id: res.name}
      }))
  }

  remove(connection: Connection): Observable<void> {
    return this.http
      .delete<void>(`${ConnectionsService.url}/${connection.userId}.json`)
  }
}
