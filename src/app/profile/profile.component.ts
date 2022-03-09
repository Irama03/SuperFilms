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
  error: string = '';

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
    if (userName.trim().length === 0)
      this.error = 'Username might not be empty!';
    else if (userAge.trim().length === 0)
      this.error = 'Age might not be empty!';
    else if (Number.isNaN(Number.parseInt(userAge)))
      this.error = 'Age might be an integer!';
    else {
      const numberAge = Number(userAge);
      if (numberAge < 5 || numberAge > 120)
        this.error = 'Age is out of bounds!';
      else{
        this.error = '';
        if (!(userName === this.name && userAge === this.age)){
          this.name = userName;
          this.age = userAge;
          this.connectionsService.updateNameAndAge(userName, userAge);
        }
      }
    }
  }

}
