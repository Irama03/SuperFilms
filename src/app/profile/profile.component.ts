import { Component, OnInit } from '@angular/core';
import {ConnectionsService} from "../shared/services/connections.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public email: string = '';
  public name: string = '';
  public age: string = '';

  constructor(public connectionsService: ConnectionsService) { }

  ngOnInit(): void {
    this.connectionsService.connection.subscribe(this.generate.bind(this));
  }

  generate(value: any) {
    this.email = value.email;
    this.name = value.name;
    this.age = value.age;
  }

  saveChanges(userName: string, userAge: string) {
    this.name = userName;
    this.age = userAge;
    //this.connectionsService.connection.value.name = userName;
    //this.connectionsService.connection.value.age = userAge;
    this.connectionsService.updateNameAndAge(userName, userAge);
  }

}
