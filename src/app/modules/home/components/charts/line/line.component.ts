import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  series: any[] = [{
    name: '2015',
    data: [4.907, 5.943, 6.848, 7.284, 8.263, 8.801, 4.890, 7.238, 8.522, 7.855]
          }, {
    name: '2016',
    data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, 7.832, 4.3, 4.3]
          }, {
    name: '2017',
    data: [0.010, 0.375, 1.161, 0.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995]
          }, {
    name: '2018',
    data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727]
          }];
  categories: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  constructor() { }

  ngOnInit() {
  }

}
