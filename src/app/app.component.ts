import { Component } from '@angular/core';

export interface Card {
  title: string,
  text: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperFilms';
  toggle = true;

  cards: Card[] = [
    {title: 'Card1', text: 'This is card 1'},
    {title: 'Card2', text: 'This is card 2'},
    {title: 'Card3', text: 'This is last card'}
  ]

  toggleCards(){
    this.toggle = !this.toggle;
  }
}
