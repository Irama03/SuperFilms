import { Component, OnInit } from '@angular/core';
import {PeopleService} from "../shared/services/people.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Person} from "../shared/models/person";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  findForm: FormGroup = new FormGroup({});

  constructor(public peopleService: PeopleService) { }

  ngOnInit(): void {
    this.findForm = new FormGroup({findStr: new FormControl('')})
  }

  find() {
    const {findStr} = this.findForm.value;
    const findStr0 = findStr.trim().toLowerCase();
    this.peopleService.findStr = findStr0;
    if (findStr0.length !== 0) {
      this.peopleService.findApplied = true;
      this.peopleService.people = [];
      for (const person of this.peopleService.initialPeople) {
        if (person.name.toLowerCase().includes(findStr0))
          this.peopleService.people.push(person);
      }
    }
    else {
      this.peopleService.findApplied = false;
      this.peopleService.people = this.peopleService.friends;
    }
  }

  isFriend(person: Person) {
    console.log("Quant of friends: " + this.peopleService.friends.length);
    return this.peopleService.friends.includes(person);
  }

}
