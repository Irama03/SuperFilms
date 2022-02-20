import { Component, OnInit } from '@angular/core';

//templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css']

@Component({
  selector: 'app-form',
  template: `
    <div>
      <p class="fr">A form</p>
    </div>
  `,
  styles: [
    `
      .fr{
        border: 1px solid orange;
      }
    `
  ]
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
