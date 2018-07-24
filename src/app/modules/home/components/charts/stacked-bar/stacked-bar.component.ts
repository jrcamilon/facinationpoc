import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.scss']
})
export class StackedBarComponent implements OnInit {

  @Input() dataIn: any;
  primary: string;
  secondary: string;

  @Input() primaryPercentage: Number;
  @Input() secondaryPercentage: Number;

  mockData = [
    {type: 'trust', value: 10, color: 'blue'},
    {type: 'innovation', value: 11, color: 'red'}
  ];

  constructor( ) {

  }

  ngOnInit() {
    this.primary = this.dataIn[0]['type'];
    this.secondary = this.dataIn[1]['type'];
  }


}
