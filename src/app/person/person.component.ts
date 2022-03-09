import {Component, Input, OnInit} from '@angular/core';
import {PeopleService} from "../shared/services/people.service";
import {Person} from "../shared/models/person";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  name: string = 'Name';
  // @ts-ignore
  @Input() person: Person;
  @Input() isFriend: boolean = true;

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
  }

  addFriend() {
    this.isFriend = true;
    this.peopleService.friends.push(this.person);
    // @ts-ignore
    this.peopleService.connectionsService.updateFriends(this.peopleService.friends.map(friend => friend.id));
  }

  removeFriend() {
    this.isFriend = false;
    // @ts-ignore
    this.peopleService.friends.splice(this.peopleService.friends.indexOf(this.person.id), 1);
    this.peopleService.people.splice(this.peopleService.people.indexOf(this.person), 1);
    // @ts-ignore
    this.peopleService.connectionsService.updateFriends(this.peopleService.friends.map(friend => friend.id));
  }
}
