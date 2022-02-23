import {Component, Input, OnInit} from "@angular/core";
import {Game, GamesService} from "../shared/services/games.service";
import {FilterService} from "../shared/services/filter.service";
import {Connection, ConnectionsService} from "../shared/services/connections.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  // @ts-ignore
  @Input() card: Game;
  // @ts-ignore
  @Input() index: number;

  name: string = 'Name';
  price: number = 0;
  description: string = 'Description';
  tag: string = 'Tag';
  main: boolean = true;

  constructor(public gamesService: GamesService, public connectionService: ConnectionsService, public authService: AuthService) { }

  addToLibrary() {
    /*const {uid} = this.authService.userData.uid;
    const {games}: string[] = [];

    const connection: Connection = {
      uid,
      games,
      []
    }

    this.connectionService.create(this.authService.userData.uid);
    this.gamesService.create(game).subscribe(game => {
      this.gamesService.games.push(game);
      this.form.reset();
    }, err => console.log(err));*/
    console.log("adding to library");
  }

  /*array = [1,2,3];
  obj = {name: 'Ira', info: {age: 19, job: 'Student'}};
  imgUrl = 'https://files.worldwildlife.org/wwfcmsprod/images/Panda_in_Tree/hero_small/99i33zyc0l_Large_WW170579.jpg';
  disabled = false;
  textColor = 'black';

  getInfo(): string {
    return "This is info";
  }*/

  ngOnInit(): void {
    //setTimeout(() => {
    //  this.imgUrl = 'https://i.pinimg.com/222x/51/dd/b1/51ddb1b0126b6304cb6d85d01c4cb789.jpg';
    //  this.disabled = true;
    //}, 3000);
  }

  //changeTitle() {
  //  this.title = 'Title has been changed!'
  //}

  /*inputHandler(event: any) {
    //console.log(event);
    const value = event.target.value;
    this.title = value;
  }*/

  //inputHandler(value: string) {
  //  this.title = value;
  //}
}
