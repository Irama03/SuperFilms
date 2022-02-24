import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../shared/services/games.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  name: string = 'Name';
  // @ts-ignore
  @Input() person: Person;
  @Input() isFriend: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
