import { Component, OnInit, Output } from '@angular/core';
import {NodejsApiService} from '../../services/nodejs-api.service';
@Component({
  selector: 'app-nav-global',
  templateUrl: './nav-global.component.html',
  styleUrls: ['./nav-global.component.scss']
})
export class NavGlobalComponent implements OnInit {

  constructor(private _nodeApi: NodejsApiService ) { 

  }

  @Output() searchContent : any;
  ngOnInit() {
    // this.searchContent = "Accenture";
  }

  changeOrganization(event: any) {
    for(let i = 0; i< event.target.length;i++){
      let row = event.target[i];
      if(row.selected){
        this.searchContent = row.label;
      }
    }
    // console.log( this.searchContent);
    NodejsApiService.orgFilter = this.searchContent;
    this._nodeApi.getPrimaryDonutChartData().subscribe((data)=>{
      this._nodeApi.primaryDonutChartData.next(data);
    })
    // Dormant Donut Data
    this._nodeApi.getDormantDonutChartData().subscribe((data) => {
      this._nodeApi.dormantDonutChartData.next(data);
    });
    // console.log(this.searchContent);
    this._nodeApi.getSecondaryDonutChartData().subscribe((data)=>{
      this._nodeApi.secondaryDonutChartData.next(data);
    })
  }

  
}
