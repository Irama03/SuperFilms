import {Component, Input, OnInit} from "@angular/core";
import {Card} from "../app.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  // @ts-ignore
  @Input() card: Card;
  // @ts-ignore
  @Input() index: number;

  title:string = 'My card title';
  text: string = 'My sample text'

  cardDate: Date = new Date();

  array = [1,2,3];
  obj = {name: 'Ira', info: {age: 19, job: 'Student'}};
  imgUrl = 'https://files.worldwildlife.org/wwfcmsprod/images/Panda_in_Tree/hero_small/99i33zyc0l_Large_WW170579.jpg';
  disabled = false;
  textColor = 'black';

  getInfo(): string {
    return "This is info";
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.imgUrl = 'https://i.pinimg.com/222x/51/dd/b1/51ddb1b0126b6304cb6d85d01c4cb789.jpg';
      this.disabled = true;
    }, 3000);
  }

  changeTitle() {
    this.title = 'Title has been changed!'
  }

  /*inputHandler(event: any) {
    //console.log(event);
    const value = event.target.value;
    this.title = value;
  }*/

  inputHandler(value: string) {
    this.title = value;
  }
}
