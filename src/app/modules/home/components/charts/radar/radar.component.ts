import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

  public banksData = [
    { name: "Passion", pre: 15, post: 16 },
    { name: "Innovation", pre: 2, post: 16 },
    { name: "Power", pre: 4, post: 4 },
    { name: "Trust", pre: 7, post: 7 },
    { name: "Prestige", pre: 13, post: 10 },
    { name: "Alert", pre: 11, post:  12 },
    { name: "Mystique", pre: 9, post: 11 }   
  ];
  ngOnInit(){
    
  }
  public labelContent(e: any): string {
      return `${ e.dataItem.time.substring(0, 2) }h`;
  }
}
