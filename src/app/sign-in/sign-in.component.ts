import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  error: string = '';

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  signIn(userName: string, userPassword: string) {
    if (userName.trim().length === 0)
      this.error = 'Email might not be empty!';
    else if (userPassword.trim().length === 0)
      this.error = 'Password might not be empty!';
    else if (!userName.includes('@'))
      this.error = 'Inappropriate format of email!';
    else {
      this.authService.SignIn(userName, userPassword).catch(() => {
        //window.alert(error.message)
        this.error = 'Such user does not exist or there are problems with network!';
      });
    }
  }
}
