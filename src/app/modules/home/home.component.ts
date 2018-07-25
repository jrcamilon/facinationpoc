import { Component, OnInit,Output } from '@angular/core';
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

  // Output Variables
  // @Output() x: any;
  
  public checked: boolean = true;
  primaryPopulation: any = 'PRIMARYPOPULATION';
  dormantPopulation: any =   'DORMANTPOPULATION';
  secondaryPopulation: any = 'SECONDARYPOPULATION';
  secondaryOrganization: any='SECONDARYORGANIZATION';
  primaryOrganization: any = 'PRIMARYORGANIZATION';
  dormantOrganization: any = 'DORMANTORGANIZATION';
  dormant: any= false;
  secondary: any = true;
 
  // Local Variables
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

  // Constructor loading in the Node and IBE API Service
  constructor(private _nodeApi: NodejsApiService, public _IBE: IbeService) {
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
    // Matrix Data
    this._nodeApi.getAllFiles().subscribe((data) => {
      console.log(data);
      for (let i = 1 ; i <= this.advantages.length - 1 ; i++ ) {
        for (let j = 1; j <= this.advantages.length -1 ; j++) {
          filterKey  = `${i}${j}`;
          commonArchetypes = [];

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
    // Primary Donut Data
    this._nodeApi.getPrimaryDonutChartData().subscribe((data) => {
      console.log("primaryData",data);
      this._nodeApi.primaryDonutChartData.next(data);
    });
     // Dormant Donut Data
     this._nodeApi.getSecondaryDonutChartData().subscribe((data) => {
      console.log("secondaryData",data);

      this._nodeApi.secondaryDonutChartData.next(data);
    });

    // Dormant Donut Data
    this._nodeApi.getDormantDonutChartData().subscribe((data) => {
      console.log("dormantData",data);

      this._nodeApi.dormantDonutChartData.next(data);
    });

    this._nodeApi.gridTileData.subscribe(data=>{
      this.gridTileData = data;
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

// Method to get all grid tile data
addToService(arr: any) {
 this.gridTileData = arr;
 this._nodeApi.gridTileData.next(arr);
}

 changeDonut(event: any) {

  this.dormant =(event==false) ? true : false;
  this.secondary  = (event==false) ? false : true;
  this.ngOnInit();
}

boxClicked(x: Number, y: Number) {
    const index = x.toString() + y.toString();
    console.log(index);
    // this.x = x;

    const boxExcludeList = ['01', '02' , '03' , '04' , '05' , '06', '07', '10', '20', '30', '40', '50', '60', '70' ];
    const primaryBoxesForVideo = ['10', '20', '30', '40', '50', '60', '70'];
    const i = this.gridTileData.findIndex(ele => ele.key === index);

    // if (this.gridTileData[i]['data'].length !== 0) {
    //   if (!boxExcludeList.includes(index)) {
    //     this.onModalOpen(index);
    //   }
    // }
    // console.log(this.gridTileData[i].length);

    if (!boxExcludeList.includes(index) && this.gridTileData[i]['data'].length !== 0) {
      this.onModalOpen(index);
    } else if (primaryBoxesForVideo.includes(index)) {
      console.log(index);
      this.videoModalOpen(index);
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

}
