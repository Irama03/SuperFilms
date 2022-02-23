import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CreateResponse, Game} from "./games.service";
import {ConnectionsService} from "./connections.service";

export interface Person {
  id?: string
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/people';
  public people: Person[] = [];
  public friends: Person[] = [];

  constructor(private http: HttpClient, private connectionsService: ConnectionsService) {
    /*const name = "Petro Petrenko";
    const person: Person = {
      name
    };
    this.create(person).subscribe((person) => this.people.push(person));*/
    /*this.load().subscribe(people => {
      this.people = people;
      for (const person of people) {
        // @ts-ignore
        if (connectionsService.connection.friends.includes(person.id)) {
          this.friends.push(person);
        }
      }
    })*/
  }

  load(): Observable<Person[]> {
    return this.http
      .get<Person[]>(`${PeopleService.url}.json`)
      .pipe(map(people => {
        if (!people) {
          return [];
        }
        // @ts-ignore
        return Object.keys(people).map(key => ({...people[key], id: key}))
      }))
  }

  create(person: Person): Observable<Person> {
    return this.http
      .post<CreateResponse>(`${PeopleService.url}.json`, person)
      .pipe(map(res => {
        return {...person, id: res.name}
      }))
  }

  remove(person: Person): Observable<void> {
    return this.http
      .delete<void>(`${PeopleService.url}/${person.id}.json`)
  }
}
