import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/services/filter.service";
import {Game, GamesService} from "../shared/services/games.service";
import {AuthService} from "../shared/services/auth.service";
import {ConnectionsService} from "../shared/services/connections.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(public gamesService: GamesService) {}

  ngOnInit(): void {}

}
