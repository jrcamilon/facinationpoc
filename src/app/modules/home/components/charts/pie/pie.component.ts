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
    { category: 'Female', value: 0.58 },
    { category: 'Other',value: .54}
  ];

  @Input() males: any;
  @Input() females: any;
  @Input() others: any;
  @Input() title: string;
  @Input() type: any;
  
  constructor() { }

  ngOnInit() {

    console.log(this.type);
    if (this.type === 'archetype') {  
      if(this.males!=undefined){
        console.log(this.males);
        this.pieData[0].value = ( this.males / (this.males + this.females)) * 100

      }
      else{
        this.pieData[0].value = 0;
      }
      if(this.females !=undefined){
        this.pieData[1].value = ( this.females / (this.males + this.females))* 100;
        console.log(this.females);

      }
      else{
        this.pieData[1].value = 0;
      }
      if(this.others != undefined){
        this.pieData[2].value = (this.others/(this.males+this.females+this.others))*100;
      } 
      else {
        this.pieData[2].value= 0;
      }
    }
    // } else {
    //   if(this.males!=undefined){
    // console.log(this.males);

    //   this.pieData[0].value = (this.males / (NodejsApiService.totalMales)) * 100;
      

    //   }
    //   else{
    //     this.pieData[0].value = 0;
    //   }
    //   if(this.females !=undefined){
    //     this.pieData[1].value = (this.females / (NodejsApiService.totalFemales))* 100 ;
    //     console.log(this.females);

    //   }
    //   else{
    //     this.pieData[1].value = 0;
    //   }
     
    // }

  }
}
