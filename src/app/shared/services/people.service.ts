import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CreateResponse} from "./games.service";
import {ConnectionsService} from "./connections.service";
import {Person} from "../models/person";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  static url = 'https://supergames-8b60f-default-rtdb.europe-west1.firebasedatabase.app/people';
  public initialPeople: Person[] = [];
  public friends: Person[] = [];
  public people: Person[] = [];

  public findApplied = false;
  public findStr = '';

  constructor(public connectionsService: ConnectionsService) {
    /*const name = "Oleh Dudenko";
    const person: Person = {
      name
    };
    this.create(person).subscribe((person) => this.people.push(person));*/
    this.load().subscribe(people => {
      this.initialPeople = people;
      let peopleFriends;
      if (connectionsService.connection.value === undefined) {
        connectionsService.load().subscribe(connections => {
          for (const con of connections) {
            // @ts-ignore
            if (con.userId == connectionsService.authService.userData.uid) {
              console.log("Got connection in people");
              connectionsService.connection.next(con);
              peopleFriends = connectionsService.connection.value.friends;
              console.log("peopleFriends load: " + peopleFriends.length + " " + peopleFriends);
              for (const person of people) {
                console.log("P: " + person.id);
                //@ts-ignore
                if (peopleFriends.includes(person.id)) {
                  console.log("push");
                  this.friends.push(person);
                }
              }
              this.people = this.friends;
              break;
            }
          }
        })
      }
      else {
        peopleFriends = connectionsService.connection.value.friends;
        console.log("peopleFriends: " + peopleFriends.length + " " + peopleFriends);
        for (const person of people) {
          console.log("P: " + person.id);
          //@ts-ignore
          if (peopleFriends.includes(person.id)) {
            console.log("push");
            this.friends.push(person);
          }
        }
        this.people = this.friends;
      }
    })
  }

  load(): Observable<Person[]> {
    return this.connectionsService.http
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
    return this.connectionsService.http
      .post<CreateResponse>(`${PeopleService.url}.json`, person)
      .pipe(map(res => {
        return {...person, id: res.name}
      }))
  }

  remove(person: Person): Observable<void> {
    return this.connectionsService.http
      .delete<void>(`${PeopleService.url}/${person.id}.json`)
  }
}
