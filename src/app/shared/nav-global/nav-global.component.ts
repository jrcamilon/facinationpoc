import { Component, OnInit, Output } from '@angular/core';
import {NodejsApiService} from '../../services/nodejs-api.service';
@Component({
  selector: 'app-nav-global',
  templateUrl: './nav-global.component.html',
  styleUrls: ['./nav-global.component.scss']
})
export class NavGlobalComponent implements OnInit {

  constructor(private _nodeApi: NodejsApiService ) { 
    this._nodeApi.orgnizationList.subscribe(data=>{

      this.organizations = data;
      // console.log(this.organizations);
    });

  }

  @Output() searchContent : any;
  @Output() conference: any;
  public organizations: any;
  
  ngOnInit() {
    // this.searchContent = "Accenture";
    // this._nodeApi.orgnizationList.subscribe(data=>{
    //     this.organizations = data;

    //   });
  }

  changeConference(event:any){
    for(let i = 0; i< event.target.length;i++){
      let row = event.target[i];
      if(row.selected){
        this.conference = row.label;
      }
    }
    console.log(this.conference);
    NodejsApiService.conFilter = this.conference=="View All" ? "all" :  this.conference;
    if(NodejsApiService.conFilter=="ACMP18"){
      NodejsApiService.orgFilter ="71andchange";
    }else if(NodejsApiService.conFilter=="ICON2015"){
      NodejsApiService.orgFilter = "aarp";
    }

    console.log(NodejsApiService.conFilter);
    console.log(NodejsApiService.orgFilter);

    // console.log(NodejsApiService.conFilter);
    this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
      this._nodeApi.orgnizationList.next(data);
      this._nodeApi.orgnizationList.subscribe(data=>{
        this.organizations = data;
      console.log(this.organizations);
      });
    });

   
    // console.log(this.organizations);
     // console.log( this.searchContent);

     this._nodeApi.getAllFiles().subscribe((data)=>{
       let newArr: any = [];
      for (let i = 1 ; i <= 7 ; i++ ) {
        for (let j = 1; j <= 7 ; j++) {
           let filterKey  = `${i}${j}`;
          let commonArchetypes = [];

          for (let a = 0; a < data.length; a++) {
            const row = data[a];

            if ( `${row.boxKey}` === filterKey ) {
              commonArchetypes.push(row);
            }
          }
          const newParsedBoxData = {key: filterKey , data: commonArchetypes};
          newArr.push(newParsedBoxData);

        }
      }
      this.addToService(newArr);
       this._nodeApi.allData.next(data);
     });
    //  NodejsApiService.orgFilter = this.searchContent;
     this._nodeApi.getPrimaryDonutChartData().subscribe((data)=>{
       console.log(data);
       this._nodeApi.primaryDonutChartData.next(data);
     })
     // Dormant Donut Data
     this._nodeApi.getDormantDonutChartData().subscribe((data) => {
      console.log(data);

       this._nodeApi.dormantDonutChartData.next(data);
     });
     // console.log(this.searchContent);
     this._nodeApi.getSecondaryDonutChartData().subscribe((data)=>{
      console.log(data);

       this._nodeApi.secondaryDonutChartData.next(data);
     })

    //  this.ngOnInit();
  }
  // Method to get all grid tile data
addToService(arr: any) {
  this._nodeApi.gridTileData.next(arr);
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
    this._nodeApi.getAllFiles().subscribe((data)=>{
      let newArr: any = [];
     for (let i = 1 ; i <= 6 ; i++ ) {
       for (let j = 1; j <= 6 ; j++) {
          let filterKey  = `${i}${j}`;
         let commonArchetypes = [];

         for (let a = 0; a < data.length; a++) {
           const row = data[a];

           if ( `${row.boxKey}` === filterKey ) {
             commonArchetypes.push(row);
           }
         }
         const newParsedBoxData = {key: filterKey , data: commonArchetypes};
         newArr.push(newParsedBoxData);

       }
     }
     this.addToService(newArr);
      this._nodeApi.allData.next(data);
    });
  }

  
}
