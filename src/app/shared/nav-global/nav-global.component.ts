import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import {NodejsApiService} from '../../services/nodejs-api.service';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-global',
  templateUrl: './nav-global.component.html',
  styleUrls: ['./nav-global.component.scss']
})
export class NavGlobalComponent implements OnInit {

  @ViewChild("selectCon")  selectCon: ElementRef;
  @ViewChild("selectOrg") selectOrg: ElementRef;

  @Output() searchContent : any;
  @Output() conference: any;

  public organizations: any;
  public conferences: any = ["View All","ACMP18","ICON2015"];
  public conError: String;
  public orgError: String;
  public allOrgs: any;
  public acmpOrgs: any;
  public iconOrgs: any;
  public selectedItem:any;
  public selectedCon: any = this.conferences[0]
  public opened: any = false;
  constructor(private _nodeApi: NodejsApiService ) {
 
    this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
      this.organizations = data;
      this.selectedItem = this.organizations[0];
    });
    this._nodeApi.allOrgs.subscribe(data =>{
      // this.organizations = data;
      this.allOrgs = data;
    });
    this._nodeApi.acmpOrgs.subscribe(data =>{
      this.acmpOrgs = data;
    });
    this._nodeApi.iconOrgs.subscribe(data =>{
      this.iconOrgs = data;
    });
  }

  ngOnInit() {
    this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
      this.organizations = data;
      this.selectedItem = this.organizations[0];
    });
    this._nodeApi.allOrgs.subscribe(data =>{
      // this.organizations = data;
      this.allOrgs = data;
    });
    this._nodeApi.acmpOrgs.subscribe(data =>{
      this.acmpOrgs = data;
    });
    this._nodeApi.iconOrgs.subscribe(data =>{
      this.iconOrgs = data;
    });
    this.getAllFiles();

  }

  //Get Various Organization Lists
  changeConference(event:any){

    console.log("User has changed the Conference");
    console.log("The previous org filter was ",NodejsApiService.previousOrgFilter);

    this.conference =this.selectCon.nativeElement.value;
    console.log("Retrieved the conference from the element", this.conference);
    NodejsApiService.conFilter = this.conference === "View All" ? "all" :  this.conference;
    console.log("Set the NodeJS Con Filter", NodejsApiService.conFilter);
    NodejsApiService.matrixConFilter = NodejsApiService.conFilter;
    // this.getOrganizationList();

    switch(NodejsApiService.conFilter){
      case "all":
      this.organizations = this.allOrgs;
      break;
      case "ACMP18":
      this.organizations = this.acmpOrgs;
      break;
      case "ICON2015":
      this.organizations = this.iconOrgs;
      break;
    }

    let foundOrg = _.find(this.organizations,{organization:NodejsApiService.previousOrgFilter});
    let index = _.findIndex(this.organizations,{organization:NodejsApiService.previousOrgFilter});
    if(foundOrg!=undefined){
      console.log("found");
      NodejsApiService.orgFilter = NodejsApiService.previousOrgFilter;
      NodejsApiService.matrixOrgFilter = NodejsApiService.previousOrgFilter;
      console.log(index);
      // this.selectOrg.nativeElement.selectedIndex = index;

      
      console.log(this.selectOrg,NodejsApiService.previousOrgFilter);
      console.log(this.selectOrg.nativeElement.value);
      this.getAllFiles();
      this.getDonutChartData();
      this.selectedItem = this.organizations[index];

    } else{
      console.log("Not Found")
      this.conError = NodejsApiService.conFilter;
      this.orgError = NodejsApiService.previousOrgFilter;
      NodejsApiService.orgFilter = "gmail";
      NodejsApiService.matrixOrgFilter = "gmail";
      NodejsApiService.previousOrgFilter = "gmail"; 
      this.getAllFiles();
      this.getDonutChartData();
      this.open();
    }
    console.log(this.selectedItem);

  }


  getOrganizationList(){
    

    let foundOrg = _.find(this.organizations,{organization:NodejsApiService.previousOrgFilter})

    console.log(foundOrg);

    if(foundOrg!=undefined){
      NodejsApiService.orgFilter = NodejsApiService.previousOrgFilter;
      NodejsApiService.matrixOrgFilter = NodejsApiService.previousOrgFilter;

      
      console.log(this.selectOrg,NodejsApiService.previousOrgFilter);
      this.selectOrg.nativeElement.value = NodejsApiService.orgFilter;
      console.log(this.selectOrg.nativeElement.value);
      this.getAllFiles();
      this.getDonutChartData();
      
    } else{
      this.conError = NodejsApiService.conFilter;
      this.orgError = NodejsApiService.previousOrgFilter;
      // NodejsApiService.orgFilter = "gmail";
      // NodejsApiService.matrixOrgFilter = "gmail";
      // NodejsApiService.previousOrgFilter = "gmail";

      this.open();
    }
    

     
    // this.foundOrgInCon = false;
    // this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
    //   this._nodeApi.orgnizationList.next(data);
    //   this._nodeApi.orgnizationList.subscribe(data=>{
    //     this.organizations = data;

    //     console.log("Searching for ",NodejsApiService.previousOrgFilter," in ",this.organizations);

    //     for(let i = 0 ; i < this.organizations.length; i++){
    //       let row = this.organizations[i];
    //       if(row.organization === NodejsApiService.previousOrgFilter){
    //         this.foundOrgInCon = true;
    //       }
    //     }


    //     if(this.foundOrgInCon){
    //       console.log(true);
    //       NodejsApiService.orgFilter = NodejsApiService.previousOrgFilter;
    //       this.selectOrg.nativeElement.value = NodejsApiService.orgFilter;
    //    
    //     }else{
    //       console.log(false);
    //       this.open();
    //     }
    

    //   });
    // });
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

    console.log("User has changed the organization",event);
    // for(let i = 0; i< event.target.length;i++){
    //   let row = event.target[i];
    //   if(row.selected){
    //     this.searchContent = row.label;
    //   }
    // }
    this.searchContent =event.target.selectedOptions[0].innerHTML;

    console.log("Changing the org filter from ",NodejsApiService.orgFilter,"to", this.searchContent);
    NodejsApiService.matrixOrgFilter = this.searchContent;
    NodejsApiService.orgFilter = this.searchContent;
    console.log("Changing the previous org filter from ",NodejsApiService.previousOrgFilter,"to",NodejsApiService.orgFilter);

    NodejsApiService.previousOrgFilter = NodejsApiService.orgFilter;
    this.getAllFiles();
    this.getDonutChartData();
  }

  resetMatrix(event: any) {
    NodejsApiService.previousOrgFilter = NodejsApiService.orgFilter;
    NodejsApiService.orgFilter = "gmail";
    NodejsApiService.matrixOrgFilter = "gmail"
    NodejsApiService.matrixConFilter = "all";
    NodejsApiService.conFilter = "all";
    this.selectedItem = this.organizations[0];
    console.log(this.selectedItem);
    this.selectedCon = this.conferences[0];
    this.selectCon.nativeElement.selectedIndex = "0";
    this.selectOrg.nativeElement.selectedIndex = "0";

 
  
       this.getAllFiles();
    this.getDonutChartData();
  }
}
