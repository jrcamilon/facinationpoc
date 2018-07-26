import { Component, OnInit, Output,ViewChild,ElementRef } from '@angular/core';
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
  @ViewChild("selectCon", {read: ElementRef}) selectCon: ElementRef;
  @ViewChild("selectOrg", {read: ElementRef}) selectOrg: ElementRef;

  @Output() searchContent : any;
  @Output() conference: any;
  public organizations: any;
  
  ngOnInit() {
    // this.searchContent = "Accenture";
    // this._nodeApi.orgnizationList.subscribe(data=>{
    //     this.organizations = data;

    //   });
    this.getAllFiles();
   
  }

  changeConference(event:any){
    for(let i = 0; i< event.target.length;i++){
      let row = event.target[i];
      if(row.selected){
        this.conference = row.label;
      }
    }
    NodejsApiService.conFilter = this.conference=="View All" ? "all" :  this.conference;
    if(NodejsApiService.conFilter=="ACMP18"){
      NodejsApiService.orgFilter ="gmail";
    } else if(NodejsApiService.conFilter =="all"){
      NodejsApiService.orgFilter = "gmail"
    }else if(NodejsApiService.conFilter=="ICON2015"){
      NodejsApiService.orgFilter = "gmail";
    }
    

 
    

   
    // console.log(this.organizations);
     // console.log( this.searchContent);
    this.getOrganizationList();
     this.getAllFiles();
     this.getDonutChartData();

    //  this.ngOnInit();
  }

  getOrganizationList(){
    // console.log(NodejsApiService.conFilter);
    this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
      this._nodeApi.orgnizationList.next(data);
      this._nodeApi.orgnizationList.subscribe(data=>{
        this.organizations = data;
      });
    });
  }
  getDonutChartData(){
    //  NodejsApiService.orgFilter = this.searchContent;
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
  getAllFiles(){
    this._nodeApi.getAllFiles().subscribe((data)=>{
      console.log(data);
      let newArr: any = [];
     for (let i = 1 ; i <= 7 ; i++ ) {
       for (let j = 1; j <= 7 ; j++) {
          let filterKey  = `${i}${j}`;
         let commonArchetypes = [];

         for (let a = 0; a < data.length; a++) {
           const row = data[a];

           if ( `${row.boxkey}` == filterKey ) {
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
    this.getAllFiles();
  }

  resetMatrix(event: any){
    NodejsApiService.orgFilter = "gmail";
    NodejsApiService.conFilter = "all";
  
    this.selectOrg.nativeElement.value = "gmail";
    console.log(this.selectCon);
    this.selectCon.nativeElement.selectedIndex = 0;
    this.getAllFiles();
    this.getDonutChartData();
  }
}
