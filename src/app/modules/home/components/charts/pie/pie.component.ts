import { Component, OnInit,Input } from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {


  public pieData: any = [
    { category: 'Male', value: 0.42 },
    { category: 'Female', value: 0.58 }
  ]
  @Input() males: any;
  @Input() females: any;

  constructor() { }

  ngOnInit() {

    console.log(this.males);
    console.log(this.females);
    this.pieData[0].value = this.males/ (this.males+this.females);
    this.pieData[1].value = this.females / (this.males+this.females);
  }

}
