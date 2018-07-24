import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';
import { access } from 'fs';



// import { data } from './donut-mock-data';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  total: any;

  advantageColors = [
    { advantage: 'innovation', color: '#EDA716'},
    { advantage: 'passion', color: '#B74A2A' },
    { advantage: 'power', color: '#82181B' },
    { advantage: 'prestige', color: '#472656'},
    { advantage: 'trust', color: '#223D6E'},
    { advantage: 'mystique', color: '#005B5D'},
    { advantage: 'alert', color: '#285A17'}
  ];

  // Input Variables
  @Input() type: any;

  // Output Variables
  @Output() selected: EventEmitter<any> = new EventEmitter();

  // Local Variables
  data: any;
  title: any;


  // Constructor loading the Node API Service
  constructor(private node: NodejsApiService) {

  }

  // On Initialize
  ngOnInit() {
    // console.log(this.type);

    // Start swtich on the type of donut this is
    switch (this.type) {
      case 'PRIMARYORGANIZATION':
        this.node.primaryDonutChartData.subscribe(data => {
          this.data = data.organizatinal[0];
          this.addToData(this.data);
          this.data = this.calculatePercentage(this.data);
          this.assignColors(this.data);
         
          this.title = `${NodejsApiService.orgFilter} Primary Advantage`;
          
      });
      break;
      case  'DORMANTPOPULATION':
      this.node.dormantDonutChartData.subscribe(data => {
          this.data = data.population[0];
          this.addToData(this.data);
          this.data = this.calculatePercentage(this.data);
          this.assignColors(this.data);

          this.title = 'General Population Dormant Advantage';
      });
      break;
      case 'PRIMARYPOPULATION':
      this.node.primaryDonutChartData.subscribe(data => {
        this.data = data.population[0];
          this.addToData(this.data);
          this.data = this.calculatePercentage(this.data);
          this.assignColors(this.data);

          this.title = 'General Population Primary Advantage ';

      });
      break;
      case 'DORMANTORGANIZATION':
      this.node.dormantDonutChartData.subscribe(data => {
        this.data = data.organizatinal[0];
          this.addToData(this.data);
          this.data = this.calculatePercentage(this.data);
          this.assignColors(this.data);

          this.title = `${NodejsApiService.orgFilter} Dormant Advantage`;
      });
      break;
      case 'SECONDARYORGANIZATION':
      this.node.secondaryDonutChartData.subscribe(data => {
        this.data = data.organizatinal[0];
          this.addToData(this.data);
          this.data = this.calculatePercentage(this.data);
          this.assignColors(this.data);

          this.title = `${NodejsApiService.orgFilter} Secondary Advantage`;
      });
      break;
      case 'SECONDARYPOPULATION':
      this.node.secondaryDonutChartData.subscribe(data => {
        this.data = data.population[0];
          this.addToData(this.data);
          this.data = this.calculatePercentage(this.data);
          this.assignColors(this.data);
          this.title = 'General Population Secondary Advantage ';

      });
      break;
    }

  }

  calculatePercentage(arr: any){
    // console.log(this.total);
    const newData  = arr.map(row => {
      const obj =  new Object({
        Advantage: row.Advantage,
        Total: (row.Total/ this.total) * 100

      // console.log(obj);
      });
      // console.log(obj);
      return obj;
    });
    return newData;
  }
  public addToData(arr: any) {
    // getTotal
    this.getTotal(arr);

  }
public assignColors(arr: any) {
  // before assigning the this.data create add a color attribute
  const newArr = arr.map(ele => {
    return new Object({Advantage: ele.Advantage, Total: ele.Total, color: this.getColor(ele.Advantage)});
  });
  this.data = newArr;
}
  public getTotal(arr: any) {
    const sumTotals = arr.map(ele => {
      return ele.Total;
    }).reduce((acc, val) => {
      return acc + val;
    });

    this.total = sumTotals;
  }

  /*
    Assigns the colors based on the advantage
  */
  public getColor(_advantage: String) {
    const index = this.advantageColors.findIndex(x => x.advantage === _advantage);
    return this.advantageColors[index].color;
  }

  public labelContent(e: any): string {
    // console.log(e.category);
    return e.category;
  }

  public itemClicked(e: any) {
    // console.log(e.category);
    this.selected.emit(e.category);
  }


}
