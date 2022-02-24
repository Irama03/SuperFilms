import { Component, OnInit } from '@angular/core';
import { PeopleService } from "../shared/services/people.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(public peopleService: PeopleService) { }

  ngOnInit(): void {
  }

}
