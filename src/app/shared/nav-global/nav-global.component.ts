import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import {NodejsApiService} from '../../services/nodejs-api.service';
@Component({
  selector: 'app-nav-global',
  templateUrl: './nav-global.component.html',
  styleUrls: ['./nav-global.component.scss']
})
export class NavGlobalComponent implements OnInit {

  @ViewChild("selectCon", {read: ElementRef}) selectCon: ElementRef;
  @ViewChild("selectOrg", {read: ElementRef}) selectOrg: ElementRef;

  @Output() searchContent : any;
  @Output() conference: any;
  public organizations: any;
  foundOrgInCon: any;
  public opened: any = false;
  constructor(private _nodeApi: NodejsApiService ) {
    this._nodeApi.orgnizationList.subscribe(data=>{
      this.organizations = data;
    });
  }

  ngOnInit() {
    this.getAllFiles();
  }

  changeConference(event:any){

    console.log("User has changed the Conference");
    console.log("The previous org filter was ",NodejsApiService.previousOrgFilter);

    // this.getPreviousOrgFilter();
    for(let i = 0; i< event.target.length;i++){
      let row = event.target[i];
      if(row.selected){
        this.conference = row.label;
        console.log(row.label);
      }
    }


    

    //For Donut Chart    
    NodejsApiService.conFilter = this.conference == "View All" ? "all" :  this.conference;
    // NodejsApiService.orgFilter = "gmail";
    //For Matrix
    NodejsApiService.matrixConFilter = this.conference == "View All" ? "all" :  this.conference;
    // NodejsApiService.matrixOrgFilter = "gmail";
   

    this.getOrganizationList();
    // console.log(this.organizations);

   
  }
  getPreviousOrgFilter(){
    console.log(this.selectOrg.nativeElement);
    // NodejsApiService.previousOrgFilter = this.selectOrg.nativeElement.selected;
  }

  alertForEmptyOrgSet(){


  }
  getOrganizationList(){

    this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
      this._nodeApi.orgnizationList.next(data);
      this._nodeApi.orgnizationList.subscribe(data=>{
        this.organizations = data;

        console.log("Searching for ",NodejsApiService.previousOrgFilter," in ",this.organizations);


        for(let i = 0 ; i < this.organizations.length; i++){
          let row = this.organizations[i];
    
          if(row.organization === NodejsApiService.previousOrgFilter){
            // console.log("We found an instance");
            this.foundOrgInCon = true;
            this.selectOrg.nativeElement.selectedIndex = i;
            NodejsApiService.orgFilter = NodejsApiService.previousOrgFilter;
            NodejsApiService.matrixOrgFilter = NodejsApiService.previousOrgFilter;
          }
        }

        if(this.foundOrgInCon){
          console.log(true);
        }else{
          console.log(false);
        }
    
    
        
        this.getAllFiles();
        this.getDonutChartData();
        
      });
    });
  }
  public open() {
    this.opened = true;
  }
  public close(status) {
    // console.log(`Dialog result: ${status}`);
    this.opened = false;
  }
  getDonutChartData(){

    //  NodejsApiService.orgFilter = this.searchContent;
    this._nodeApi.getPrimaryDonutChartData().subscribe((data)=>{
      this._nodeApi.primaryDonutChartData.next(data);
    });
    // Dormant Donut Data
    this._nodeApi.getDormantDonutChartData().subscribe((data) => {

      this._nodeApi.dormantDonutChartData.next(data);
    });
    // console.log(this.searchContent);
    this._nodeApi.getSecondaryDonutChartData().subscribe((data)=>{

      this._nodeApi.secondaryDonutChartData.next(data);
    });
  }

  getAllFiles(){
    this._nodeApi.getAllFiles().subscribe((data)=>{
      // console.log(data);
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

    console.log("User has changed the organization");
    for(let i = 0; i< event.target.length;i++){
      let row = event.target[i];
      if(row.selected){
        this.searchContent = row.label;
      }
    }

    console.log("Changing the org filter from ",NodejsApiService.orgFilter,"to", this.searchContent);
    NodejsApiService.matrixOrgFilter = this.searchContent;
    NodejsApiService.orgFilter = this.searchContent;
    console.log("Changing the previous org filter from ",NodejsApiService.previousOrgFilter,"to",NodejsApiService.orgFilter);

    NodejsApiService.previousOrgFilter = NodejsApiService.orgFilter;



    this._nodeApi.getPrimaryDonutChartData().subscribe((data)=>{
      this._nodeApi.primaryDonutChartData.next(data);
    });
    // Dormant Donut Data
    this._nodeApi.getDormantDonutChartData().subscribe((data) => {
      this._nodeApi.dormantDonutChartData.next(data);
    });
    // console.log(this.searchContent);
    this._nodeApi.getSecondaryDonutChartData().subscribe((data)=>{
      this._nodeApi.secondaryDonutChartData.next(data);
    });
    this.getAllFiles();
  }

  resetMatrix(event: any) {
    NodejsApiService.orgFilter = "gmail";
    NodejsApiService.matrixOrgFilter = "all"
    NodejsApiService.conFilter = "all";
    this.selectOrg.nativeElement.value = "gmail";
    this.selectCon.nativeElement.selectedIndex = 0;
    this.getAllFiles();
    this.getDonutChartData();
  }
}
