import { Component, OnInit } from '@angular/core';
import { PeopleService } from "../shared/services/people.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  findForm: FormGroup = new FormGroup({});
  myFriends: boolean = true;

  constructor(public peopleService: PeopleService) { }

  ngOnInit(): void {
    this.findForm = new FormGroup({findStr: new FormControl('')})
  }

  find() {
    const {findStr} = this.findForm.value;
    const findStr0 = findStr.trim().toLowerCase();
    /*this.gamesService.filters.findStr = findStr0;
    if (findStr0.length !== 0)
      this.gamesService.filters.findApplied = true;
    else this.gamesService.filters.findApplied = false;
    this.filterChanged();*/
  }

}
