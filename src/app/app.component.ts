import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router, public authService: AuthService) {
  }

  title = 'SuperFilms';
  page = 1;

  goToGamesPage() {
    this.router.navigate(['games']);
    this.page = 1;
  }

  goToLibraryPage() {
    this.router.navigate(['library']);
    this.page = 2;
  }

  goToFriendsPage() {
    this.router.navigate(['friends']);
    this.page = 3;
  }

  goToProfilePage() {
    this.router.navigate(['profile']);
    this.page = 4;
  }
}
