import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rangebar',
  templateUrl: './rangebar.component.html',
  styleUrls: ['./rangebar.component.scss']
})
export class RangebarComponent implements OnInit {

  public weatherData = [
    { month: "Passion", min: 5, max: 11 },
    { month: "Innovation", min: 5, max: 13 },
    { month: "Trust", min: 7, max: 15 },
    { month: "Alert", min: 10, max: 19 },
    { month: "Power", min: 13, max: 23 },
    { month: "Prestige", min: 17, max: 28 },
    { month: "Mystique", min: 20, max: 30 },
    
  ];

  public labelContentFrom(e: any): string {
      return `${ e.value.from } `;
  }

  public labelContentTo(e: any): string {
      return `${ e.value.to } `;
  }

  ngOnInit() {
  }

}
