import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';


// import { data } from './donut-mock-data';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  @Input() type: any;
  @Output() selected: EventEmitter<any> = new EventEmitter();
  data: any;
  title: any;
 
  constructor(private node: NodejsApiService) {

  }
  ngOnInit() {
    console.log(this.type);
    
    switch(this.type){
      case "PRIMARYORGANIZATION":
      this.node.primaryDonutChartData.subscribe(data => {
        this.data = data.organizatinal[0];
          this.addToData(this.data);
          this.title = "RESULTS FROM aa MASTERS FOR THE FASCINATION \nADVANTAGE® TEST"
      });
      break;
      case  "DORMANTPOPULATION":
      this.node.dormantDonutChartData.subscribe(data => {
        this.data = data.population[0];
          this.addToData(this.data);
          this.title = `DORMANT ADVANTAGE RESULTS FROM THE GENERAL POPULATION FOR THE FASCINATION \nADVANTAGE® TEST`
      });
      break;
      case "PRIMARYPOPULATION":
      this.node.primaryDonutChartData.subscribe(data => {
        this.data = data.population[0];
          this.addToData(this.data);
        this.title = `RESULTS FROM THE GENERAL POPULATION FOR THE FASCINATION\n ADVANTAGE® TEST`;
      });
      break;
      case "DORMANTORGANIZATION":
      this.node.dormantDonutChartData.subscribe(data => {
        this.data = data.organizatinal[0];
          this.addToData(this.data);
          this.title = `DORMANT ADVANTAGE RESULTS FROM ARCHANGEL MASTERS FOR THE FASCINATION\n ADVANTAGE® TEST`
      });
      break;
    }
    
  }
  addToData(arr:any){
    this.data = arr;
  }
  public labelContent(e: any): string {
    // console.log(e.category);
    return e.category;

  }

  itemClicked(e: any) {
    // console.log(e.category);
    this.selected.emit(e.category);
  }


}
