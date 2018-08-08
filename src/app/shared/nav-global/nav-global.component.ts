import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import {NodejsApiService} from '../../services/nodejs-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-nav-global',
  templateUrl: './nav-global.component.html',
  styleUrls: ['./nav-global.component.scss']
})
export class NavGlobalComponent implements OnInit {

  @ViewChild('selectCon')  selectCon: ElementRef;
  @ViewChild('selectOrg') selectOrg: ElementRef;

  @Output() searchContent: any;
  @Output() conference: any;

  @Output() openDonut: EventEmitter<any> = new EventEmitter();
  @Output() closeDonut: EventEmitter<any> = new EventEmitter();

  public organizations: any;
  public conferences: any = ['View All', 'ACMP18', 'ICON2015', 'InfoSolAcademy'];
  public conError: String;
  public orgError: String;
  public allOrgs: any;
  public acmpOrgs: any;
  public iconOrgs: any;
  public infosolOrgs: any;
  public selectedItem: any;
  public selectedCon: any = this.conferences[0];
  public opened: any = false;
  public isDrillDownExpanded = false;
  public isDonutExpanded = false;
  public isMatrixExpanded = true;
  public isViewAllOrgs = true;
  public isViewAllCons = true;
  constructor(private _nodeApi: NodejsApiService ) {
 
    this._nodeApi.getConferenceOrganizations().subscribe((data) => {
      this.organizations = data;
    });
    this._nodeApi.allOrgs.subscribe(data => {
      // this.organizations = data;
      this.allOrgs = data;
    });
    this._nodeApi.acmpOrgs.subscribe(data => {
      this.acmpOrgs = data;
    });
    this._nodeApi.iconOrgs.subscribe(data => {
      this.iconOrgs = data;
    });
    this._nodeApi.infosolOrgs.subscribe(data => {
      this.infosolOrgs = data;
    });
  }

  ngOnInit() {
    this._nodeApi.getConferenceOrganizations().subscribe((data) => {
      this.organizations = data;
      this.selectedItem = "View All";

    });
    this._nodeApi.allOrgs.subscribe(data => {
      // this.organizations = data;
      this.allOrgs = data;
    });
    this._nodeApi.acmpOrgs.subscribe(data => {
      this.acmpOrgs = data;
    });
    this._nodeApi.iconOrgs.subscribe(data => {
      this.iconOrgs = data;
    });
    this.getAllFiles();

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

 // Get Various Organization Lists
 changeConference(event: any) {

  NodejsApiService.previousOrgFilter = NodejsApiService.orgFilter;
  this.conference = this.selectCon.nativeElement.value;
  this.isViewAllCons = (this.conference === 'View All' ? true : false);
  if (!this.isViewAllCons) {
    NodejsApiService.conFilter = this.conference;
    NodejsApiService.matrixConFilter = this.conference;

  } else {
    NodejsApiService.conFilter = 'all';
    NodejsApiService.matrixConFilter = 'all';
  }
  switch (NodejsApiService.conFilter) {
    case 'all':
    this.organizations = this.allOrgs;
    break;
    case 'ACMP18':
    this.organizations = this.acmpOrgs;
    break;
    case 'ICON2015':
    this.organizations = this.iconOrgs;
    break;
    case 'InfoSolAcademy':
    this.organizations = this.infosolOrgs;
  }
 if ( !this.isViewAllOrgs  ) {
    if (NodejsApiService.previousOrgFilter !== '' && NodejsApiService.previousOrgFilter !== 'all') {
      const foundOrg = _.find(this.organizations, {organization: NodejsApiService.previousOrgFilter});
      const index = _.findIndex(this.organizations, {organization: NodejsApiService.previousOrgFilter});
    if ( foundOrg !== undefined ) {
      console.log('found');
      NodejsApiService.orgFilter = NodejsApiService.previousOrgFilter;
      NodejsApiService.matrixOrgFilter = NodejsApiService.previousOrgFilter;
      console.log(index);
      // this.selectOrg.nativeElement.selectedIndex = index;
      // console.log(this.selectOrg,NodejsApiService.previousOrgFilter);
      // console.log(this.selectOrg.nativeElement.value);
      // this.getAllFiles();
      // this.getDonutChartData();
      this.selectedItem = this.organizations[index];
    } else {
      this.isDonutExpanded = false;

      console.log('Not Found');
      this.conError = NodejsApiService.conFilter;
      this.orgError = NodejsApiService.previousOrgFilter;
     
      if(NodejsApiService.conFilter === 'InfoSolAcademy') {
        NodejsApiService.orgFilter = 'gmail';
        NodejsApiService.matrixOrgFilter = 'gmail';
        NodejsApiService.previousOrgFilter = 'gmail';
        this.selectedItem = this.organizations[3];
      } else {
        NodejsApiService.orgFilter = 'gmail';
        NodejsApiService.matrixOrgFilter = 'gmail';
        NodejsApiService.previousOrgFilter = 'gmail';
        this.selectedItem =  this.organizations[0];
      }
     
      // this.getAllFiles();
      // this.getDonutChartData();
      this.open();
    }
  }
  }
  this.getAllFiles();
  this.getDonutChartData();
  
}

changeOrganization(event: any) {

  this.searchContent = event.target.selectedOptions[0].innerHTML;
  this.isViewAllOrgs = (this.searchContent === 'View All' ? true : false);
  NodejsApiService.previousOrgFilter = this.searchContent;
  NodejsApiService.matrixOrgFilter = this.searchContent;
  NodejsApiService.orgFilter = this.searchContent;

  if (this.isViewAllOrgs) {
    this.isDonutExpanded = false;
    NodejsApiService.matrixOrgFilter = 'all';
    // this.selectCon.nativeElement.selectedIndex = '0';

    this.getAllFiles();
    this.closeDonut.emit(null)

  } else {
    this.isViewAllOrgs = false;
    this.getAllFiles();
    this.getDonutChartData();
    this.isDonutExpanded = true;
    this.openDonut.emit(null);

  }
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
