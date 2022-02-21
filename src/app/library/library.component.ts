import { Component, OnInit } from '@angular/core';
import {FilterService} from "../shared/filter.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  //constructor(private filterService: FilterService) { }
  constructor() {
  }

  ngOnInit(): void {
    //this.filterService.someString.subscribe(this.generate.bind(this))
  }

  /*generate(value: any) {
    console.log(value);
  }*/

}
