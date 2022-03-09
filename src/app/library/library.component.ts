import { Component, OnInit } from '@angular/core';
import {GamesService} from "../shared/services/games.service";
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(public gamesService: GamesService) {}

  ngOnInit(): void {}

}
