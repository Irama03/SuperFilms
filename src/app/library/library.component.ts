import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/services/filter.service";
import {GamesService} from "../shared/services/games.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  //constructor(private filterService: FilterService) { }
  constructor(public filterService: FilterService, public gamesService: GamesService) { }

  ngOnInit(): void {
    //this.filterService.someString.subscribe(this.generate.bind(this))
  }

  /*generate(value: any) {
    console.log(value);
  }*/

}
