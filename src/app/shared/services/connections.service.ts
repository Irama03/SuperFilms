import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CreateResponse} from "./games.service";
import {Person} from "./people.service";
import {AuthService} from "./auth.service";

export interface Connection {
  uid: string,
  //userId: string,
  games: string[],
  friends: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {

  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/connections';
  // @ts-ignore
  public connection: Connection;

  constructor(private http: HttpClient, private authService: AuthService) {
    const uid = authService.userData.uid;
    const games: string[] = [];
    const friends: string[] = [];
    this.load(uid).subscribe(connection => {
      if (!connection) {
        const conn: Connection = {
          uid,
          games,
          friends
        };
        this.create(conn).subscribe((con) => this.connection = con);
      }
      else this.connection = connection;
    })
  }

  // або юзера передавати
  load(id: string): Observable<Connection> {
    // @ts-ignore
    return this.http.get<Connection>(`${ConnectionsService.url}/${id}.json`).pipe(connection => {
        if (!connection) {
          //return new Connection(id, [], []);
          return null;
        }
        return connection;
      });
      /*.pipe(map(people => {
        if (!people) {
          return [];
        }
        // @ts-ignore
        return Object.keys(people).map(key => ({...people[key], id: key}))
      }))*/
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
      .delete<void>(`${ConnectionsService.url}/${connection.uid}.json`)
  }
}
