import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Game {
  id?: string
  name: string,
  price: number,
  description: string,
  tag: string
}

interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class GamesService {
  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/games'

  constructor(private http: HttpClient) {
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
