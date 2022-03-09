import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CreateResponse, Game, GamesService} from "./games.service";
import {AuthService} from "./auth.service";

export interface Connection {
  id?: string,
  userId: string,
  games: string[],
  friends: string[],
  email: string,
  name: string,
  age: string
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/connections';
  // @ts-ignore
  public connection: BehaviorSubject<Connection> = new BehaviorSubject<Connection>();
  //public connection: Connection;

  constructor(public http: HttpClient, public authService: AuthService) {//}, private gamesService: GamesService) {
    if (authService.isLoggedIn) {
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user'));
      //const userId = authService.userData.uid;
      const userId = user.uid;
      console.log("AuthService in connection: " + userId);
      const games: string[] = [];
      const friends: string[] = [];
      //const email: string = authService.userData.email;
      const email: string = user.email;
      const name: string = '';
      const age: string = '';
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
            friends,
            email,
            name,
            age
          };
          this.create(conn).subscribe((con) => this.connection.next(con));
        }
      })
    }
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
      }));
  }

  create(connection: Connection): Observable<Connection> {
    return this.http
      .post<CreateResponse>(`${ConnectionsService.url}.json`, connection)
      .pipe(map(res => {
        return {...connection, id: res.name}
      }));
  }

  /*remove(connection: Connection): Observable<void> {
    return this.http
      .delete<void>(`${ConnectionsService.url}/${connection.id}.json`);
  }*/

  updateNameAndAge(userName: string, userAge: string): void {
    const val = this.connection.value;
    const id = val.id;
    const userId = val.userId;
    const games = val.games;
    const friends = val.friends;
    const email = val.email;
    const name = userName;
    const age = userAge;
    console.log('Age: ' + age);
    const conn: Connection = {
      id,
      userId,
      games,
      friends,
      email,
      name,
      age
    }
    this.http
      .put<Connection>(`${ConnectionsService.url}/${conn.id}.json`, conn)
      .subscribe(connection => {
        console.log('Age changed: ' + connection.age);
        //error - cycle
        this.connection.next(connection);
      });
  }

  updateGamesInLibrary(gamesL: string[]): void {
    const val = this.connection.value;
    const id = val.id;
    const userId = val.userId;
    const games = gamesL;
    const friends = val.friends;
    const email = val.email;
    const name = val.name;
    const age = val.age;
    const conn: Connection = {
      id,
      userId,
      games,
      friends,
      email,
      name,
      age
    }
    this.http
      .put<Connection>(`${ConnectionsService.url}/${conn.id}.json`, conn)
      .subscribe(connection => {
        console.log('Games in l changed');
        this.connection.next(connection);
      });
  }

  updateFriends(friends0: string[]): void {
    const val = this.connection.value;
    const id = val.id;
    const userId = val.userId;
    const games = val.games;
    const friends = friends0;
    const email = val.email;
    const name = val.name;
    const age = val.age;
    const conn: Connection = {
      id,
      userId,
      games,
      friends,
      email,
      name,
      age
    }
    this.http
      .put<Connection>(`${ConnectionsService.url}/${conn.id}.json`, conn)
      .subscribe(connection => {
        console.log('Friends changed');
        this.connection.next(connection);
      });
  }
}
