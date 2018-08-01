import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { NodejsApiService } from '../../services/nodejs-api.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Key } from 'protractor';
import { IbeService } from '../../services/ibe.service';
import { Runes } from './components/grid/colrow-header/models/runes.model';
import { listAnimation } from './components/animations/listAnimate';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';

class Parameter {
  prompt: String;
  value: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ listAnimation ]
})
export class HomeComponent implements OnInit {


  public checked: any = true;
  // Local Variables
  primaryPopulation: any = 'PRIMARYPOPULATION';
  dormantPopulation: any =   'DORMANTPOPULATION';
  secondaryPopulation: any = 'SECONDARYPOPULATION';
  secondaryOrganization: any = 'SECONDARYORGANIZATION';
  primaryOrganization: any = 'PRIMARYORGANIZATION';
  dormantOrganization: any = 'DORMANTORGANIZATION';
  dormant: any = false;
  secondary: any = true;
  advantages = [{title: '', subtitle: '', rune: ''},
    {title: 'Innovation', subtitle: 'You change the game with creativity', rune: Runes.innovation},
    {title: 'Passion', subtitle: 'You connect with emotion', rune: Runes.passion},
    {title: 'Power', subtitle: 'You lead with command', rune: Runes.power},
    {title: 'Prestige', subtitle: 'You earn respect with higher standards', rune: Runes.prestigue},
    {title: 'Trust', subtitle: 'You build loyalty with consistency', rune: Runes.trust},
    {title: 'Mystique', subtitle: 'You communicate with substance', rune: Runes.mystique},
    {title: 'Alert', subtitle: 'You prevent problems with care', rune: Runes.alert}];
  archetypes = [
    {key: 'innovation', value: 1},
    {key: 'passion', value: 2},
    {key: 'power', value: 3},
    {key: 'prestige', value: 4},
    {key: 'trust', value: 5},
    {key: 'mystique', value: 6},
    {key: 'alert', value: 7}
  ];
  indexedData = [];
  genderData: any;
  archetypesData: any;
  dynamicData: any;
  genderGrouped: any;
  drillDownSelected = false;
  cacheQuery1: Subscription;
  gender: String;
  /** This is all the data needed for each tile */
  allData: Subscription;
  responseData: any;
  filteredBoxData: any;
  // modal boxes
  modalOpen = false;
  modalIndex: Number;
  gridTileData: any;
  modalData: any;


  //Nav Global Variables//

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
  public selectedItem: any;
  public selectedCon: any = this.conferences[0]
  public opened: any = false;
  public isDrillDownExpanded = false;
  public isDonutExpanded = false;
  public isMatrixExpanded = true;
    // Constructor loading in the Node and IBE API Service
  constructor(private _nodeApi: NodejsApiService, public _IBE: IbeService) {

    //Nav Global
    this._nodeApi.getConferenceOrganizations().subscribe((data) => {
      this.organizations = data;
      this.selectedItem = "View All";
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


      this._nodeApi.allData.subscribe((data) => {
        
      });
      this._nodeApi.getConferenceOrganizations().subscribe((data)=>{
        this._nodeApi.orgnizationList.next(data);
      });
    
      
  }

    // On Initialize
  ngOnInit() {
      let filterKey;
      let commonArchetypes = [];
      const newArr = [];

  
      this._nodeApi.getAllOrganizations().subscribe((data)=>{
        this._nodeApi.allOrgs.next(data);

      });
      
      this._nodeApi.getAcmpOrganizations().subscribe((data)=>{
        this._nodeApi.acmpOrgs.next(data);

      });
      this._nodeApi.getIconOrganizations().subscribe((data)=>{
        this._nodeApi.iconOrgs.next(data);

      });
      // Matrix Data
      this._nodeApi.getAllFiles().subscribe((data) => {
        for (let i = 1 ; i <= this.advantages.length - 1 ; i++ ) {
          for (let j = 1; j <= this.advantages.length -1 ; j++) {
            filterKey  = `${i}${j}`;
            commonArchetypes = [];
            for (let a = 0; a < data.length; a++) {
              const row = data[a];
              // console.log(row.boxkey);
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
      // Primary Donut Data
      this._nodeApi.getPrimaryDonutChartData().subscribe((data) => {
        // console.log("primaryData",data);
        this._nodeApi.primaryDonutChartData.next(data);
      });
      // Dormant Donut Data
      this._nodeApi.getSecondaryDonutChartData().subscribe((data) => {
        // console.log("secondaryData",data);

        this._nodeApi.secondaryDonutChartData.next(data);
      });

      // Dormant Donut Data
      this._nodeApi.getDormantDonutChartData().subscribe((data) => {
        // console.log("dormantData",data);

        this._nodeApi.dormantDonutChartData.next(data);
      });

      this._nodeApi.gridTileData.subscribe(data=>{
        this.gridTileData = data;
        // console.log(this.gridTileData);
      })

      // Constants for IBE Services
      const parameters: Parameter[] = [];
      const xdc: String = '439';
      const xdcQueryName: String = 'Genders';

        if (this.cacheQuery1) {
          this.cacheQuery1.unsubscribe();
        }
        this.cacheQuery1 = this._IBE.cacheQuery(xdcQueryName, xdc, parameters).subscribe(data => {
          // ocal data
          const tmpData = JSON.parse(data);
          if (typeof tmpData['ErrorMessage'] !== 'undefined') {
            // this._IBE.Toast(tmpData['ErrorMessage']);
            console.error(tmpData['ErrorMessage']);
          } else {
              this._IBE.genders.next(tmpData);
              // console.log('here is the data', tmpData);
          }
        });
  }

  // // Method to get all grid tile data
  // addToService(arr: any) {
  // this.gridTileData = arr;
  // this._nodeApi.gridTileData.next(arr);
  // }

  // getAllFiles(){
  //   this._nodeApi.getAllFiles().subscribe((data)=>{
  //     // console.log(data);
  //     let newArr: any = [];
  //    for (let i = 1 ; i <= 7 ; i++ ) {
  //      for (let j = 1; j <= 7 ; j++) {
  //         let filterKey  = `${i}${j}`;
  //        let commonArchetypes = [];

  //        for (let a = 0; a < data.length; a++) {
  //          const row = data[a];

  //          if ( `${row.boxkey}` == filterKey ) {
  //            commonArchetypes.push(row);
  //          }
  //        }
  //        const newParsedBoxData = {key: filterKey , data: commonArchetypes};
  //        newArr.push(newParsedBoxData);
  //      }
  //    }
  //    this.addToService(newArr);
  //     this._nodeApi.allData.next(data);
  //   });
  // }
  // resetMatrix() {
  //   // NodejsApiService.orgFilter = "gmail";
  //   NodejsApiService.matrixOrgFilter = "all"
  //   NodejsApiService.matrixConFilter = "all";

  //   this.getAllFiles();
    
  //   this.ngOnInit();
  // }
  changeDonut(event: any) {

    this.dormant =(event==false) ? true : false;
    this.secondary  = (event==false) ? false : true;
    this.ngOnInit();
  }

  boxClicked(x: Number, y: Number) {

      const index = x.toString() + y.toString();
      if(index=='00'){
        console.log('reset');
        this.resetMatrix("event");
      } else{
        NodejsApiService.boxFilter = index;
        this._nodeApi.getGenderCounts().subscribe((data)=>{
          this._nodeApi.genderCounts.next(data);
        })
        const boxExcludeList = ['01', '02' , '03' , '04' , '05' , '06', '07', '10', '20', '30', '40', '50', '60', '70' ];
        const primaryBoxesForVideo = ['10', '20', '30', '40', '50', '60', '70'];
        const i = this.gridTileData.findIndex(ele => ele.key === index);
  
        if (!boxExcludeList.includes(index) && this.gridTileData[i]['data'].length !== 0) {
          this.onModalOpen(index);
        } else if (primaryBoxesForVideo.includes(index)) {
          console.log(index);
          this.videoModalOpen(index);
        }
      }

     
  }

  public videoModalOpen(index: any) {
      this.modalOpen = true;
      this.modalIndex = index;
      this.modalData = [];
  }

  public onModalOpen(index: any) {

      this.modalOpen = true;
      this.modalIndex = index;
      const i = this.gridTileData.findIndex(x => x.key === index);
      this.modalData = this.gridTileData[i]['data'] === undefined ? [] : this.gridTileData[i]['data'];
      

  }

  onModalClose(event: any) {
      this.modalOpen = false;
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
    this.searchContent = event.target.selectedOptions[0].innerHTML;

    if(this.searchContent === "View All"){
      this.isDonutExpanded = false;
      NodejsApiService.matrixOrgFilter = "all";
      this.selectCon.nativeElement.selectedIndex = "0";

      this.getAllFiles();

    }else{
      console.log("Changing the org filter from ",NodejsApiService.orgFilter,"to", this.searchContent);
      NodejsApiService.matrixOrgFilter = this.searchContent;
      NodejsApiService.orgFilter = this.searchContent;
      console.log("Changing the previous org filter from ",NodejsApiService.previousOrgFilter,"to",NodejsApiService.orgFilter);
  
      NodejsApiService.previousOrgFilter = NodejsApiService.orgFilter;
      this.getAllFiles();
      this.getDonutChartData();
      this.isDonutExpanded = true;

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
