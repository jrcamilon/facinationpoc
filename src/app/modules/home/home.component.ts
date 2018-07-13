import { Component, OnInit,Output } from '@angular/core';
import { NodejsApiService } from '../../services/nodejs-api.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Key } from 'protractor';
import { IbeService } from '../../services/ibe.service';
import { Runes } from './components/grid/colrow-header/models/runes.model';


class Parameter {
  prompt: String;
  value: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /*
    this is the key and data. data can be anything we set to.
    we pass this down to service  and check with key
    to determine which data for which box.
  */
  // gridTileData = [
  //   {key: 'box11', data: [  'Hello World', 'Box 1']},
  //   {key: 'box12', data: [  'Hello World', 'Box 2']} ,
  //   {key: 'box13', data: [  'Hello World', 'Box 3']} ,
  //   {key: 'box14', data: [  'Hello World', 'Box 4']} ,
  //   {key: 'box15', data: [  'Hello World', 'Box 5']} ,
  //   {key: 'box16', data: [  'Hello World', 'Box 6']} ,
  //   {key: 'box17', data: [  'Hello World', 'Box 7']} ,
  //   {key: 'box21', data: [  'Hello World', 'Box 8']} ,
  //   {key: 'box22', data: [  'Hello World', 'Box 9']} ,
  //   {key: 'box23', data: [  'Hello World', 'Box 10']} ,
  //   {key: 'box24', data: [  'Hello World', 'Box 11']} ,
  //   {key: 'box25', data: [  'Hello World', 'Box 12']} ,
  //   {key: 'box26', data: [  'Hello World', 'Box 13']} ,
  //   {key: 'box27', data: [  'Hello World', 'Box 14']} ,
  //   {key: 'box31', data: [  'Hello World', 'Box 15']} ,
  //   {key: 'box32', data: [  'Hello World', 'Box 16']} ,
  //   {key: 'box33', data: [  'Hello World', 'Box 17']} ,
  //   {key: 'box34', data: [  'Hello World', 'Box 18']} ,
  //   {key: 'box35', data: [  'Hello World', 'Box 19']} ,
  //   {key: 'box36', data: [  'Hello World', 'Box 20']} ,
  //   {key: 'box37', data: [  'Hello World', 'Box 21']} ,
  //   {key: 'box41', data: [  'Hello World', 'Box 22']} ,
  //   {key: 'box42', data: [  'Hello World', 'Box 23']} ,
  //   {key: 'box43', data: [  'Hello World', 'Box 24']} ,
  //   {key: 'box44', data: [  'Hello World', 'Box 25']} ,
  //   {key: 'box45', data: [  'Hello World', 'Box 26']} ,
  //   {key: 'box46', data: [  'Hello World', 'Box 27']} ,
  //   {key: 'box47', data: [  'Hello World', 'Box 28']} ,
  //   {key: 'box51', data: [  'Hello World', 'Box 29']} ,
  //   {key: 'box52', data: [  'Hello World', 'Box 30']} ,
  //   {key: 'box53', data: [  'Hello World', 'Box 31']} ,
  //   {key: 'box54', data: [  'Hello World', 'Box 32']} ,
  //   {key: 'box55', data: [  'Hello World', 'Box 33']} ,
  //   {key: 'box56', data: [  'Hello World', 'Box 34']} ,
  //   {key: 'box57', data: [  'Hello World', 'Box 35']} ,
  //   {key: 'box61', data: [  'Hello World', 'Box 36']} ,
  //   {key: 'box62', data: [  'Hello World', 'Box 37']} ,
  //   {key: 'box63', data: [  'Hello World', 'Box 38']} ,
  //   {key: 'box64', data: [  'Hello World', 'Box 39']} ,
  //   {key: 'box65', data: [  'Hello World', 'Box 40']} ,
  //   {key: 'box66', data: [  'Hello World', 'Box 41']} ,
  //   {key: 'box67', data: [  'Hello World', 'Box 42']} ,
  //   {key: 'box71', data: [  'Hello World', 'Box 43']} ,
  //   {key: 'box72', data: [  'Hello World', 'Box 44']} ,
  //   {key: 'box73', data: [  'Hello World', 'Box 45']} ,
  //   {key: 'box74', data: [  'Hello World', 'Box 46']} ,
  //   {key: 'box75', data: [  'Hello World', 'Box 47']} ,
  //   {key: 'box76', data: [  'Hello World', 'Box 48']} ,
  //   {key: 'box77', data: [  'Hello World', 'Box 49']}
  // ];

  // Output Variables
  @Output() primaryPopulation: any = "PRIMARYPOPULATION";
  @Output() dormantPopulation: any =   "DORMANTPOPULATION";
  @Output() primaryOrganization: any = "PRIMARYORGANIZATION";
  @Output() dormantOrganization: any = "DORMANTORGANIZATION";

  // Local Variables
  advantages = [{title: '', subtitle: '', rune: ''},
    {title: 'Innovation', subtitle: 'You change the game with creativity', rune: Runes.innovation},
    {title: 'Passion', subtitle: 'You connect with emotion', rune: Runes.passion},
    {title: 'Power', subtitle: 'You lead with command', rune: Runes.power},
    {title: 'Prestigue', subtitle: 'You earn respect with higher standards', rune: Runes.prestigue},
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


  //Constructor loading in the Node and IBE API Service
  constructor(private _nodeApi: NodejsApiService, public _IBE: IbeService) {
    this._nodeApi.allData.subscribe((data) => {
    });
  }

  //On Initialize 
  ngOnInit() {
    let filterKey;
    let commonArchetypes = [];
    const newArr = [];
    //Matrix Data
    this._nodeApi.getAllFiles().subscribe((data) => {
      console.log(data);
      for (let i = 1 ; i <= 7 ; i++ ) {
        for (let j = 1; j <= 7 ; j++) {
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
    //Primary Donut Data
    this._nodeApi.getPrimaryDonutChartData('aa').subscribe((data)=>{
      this._nodeApi.primaryDonutChartData.next(data);
    });
    //Dormant Donut Data
    this._nodeApi.getDormantDonutChartData('aa').subscribe((data)=>{
      this._nodeApi.dormantDonutChartData.next(data);
    });
    
    //Constants for IBE Services
    const parameters: Parameter[] = [];
    const xdc: String = '439';
    const xdcQueryName: String = 'Genders';

      if (this.cacheQuery1) {
        this.cacheQuery1.unsubscribe();
      }
      this.cacheQuery1 = this._IBE.cacheQuery(xdcQueryName, xdc, parameters).subscribe(data => {
        //Local data
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
 this._nodeApi.gridTileData.next(arr);
}


  //   // this.groupByGender(data);
  //   // this.groupByArchetype(data);
  //   // this.groupByPrimary(data);

  //   // console.log('I am here');
  //  this.indexedData =  data.map(row => {
  //     // console.log('The Primary for this record:', row.primary);
  //     // console.log('The Secondary for this record:',row.secondary);
  //     // Assign Primary Index to the data
  //     switch (row.primary) {
  //       case 'innovation':
  //       row.primaryIndex = 1;
  //       break;
  //       case 'passion':
  //       row.primaryIndex = 2;
  //       break;
  //       case 'power':
  //       row.primaryIndex = 3;
  //       break;
  //       case 'prestig':
  //       row.primaryIndex = 4;
  //       break;
  //       case 'trust':
  //       row.primaryIndex = 5;
  //       break;
  //       case 'mystique':
  //       row.primaryIndex = 6;
  //       break;
  //       case 'alert':
  //       row.primaryIndex = 7;
  //       break;
  //     }

  //     // Assign Secondary Index to the data
  //     // Assign Primary Index to the data
  //     switch (row.secondary) {
  //       case 'innovation':
  //       row.secondaryIndex = 1;
  //       break;
  //       case 'passion':
  //       row.secondaryIndex = 2;
  //       break;
  //       case 'power':
  //       row.secondaryIndex = 3;
  //       break;
  //       case 'prestige':
  //       row.secondaryIndex = 4;
  //       break;
  //       case 'trust':
  //       row.secondaryIndex = 5;
  //       break;
  //       case 'mystique':
  //       row.secondaryIndex = 6;
  //       break;
  //       case 'alert':
  //       row.secondaryIndex = 7;
  //       break;
  //     }
  //     return row;
  //   });

  // }

  // groupByGender(data: any) {

  //   const genderGrouped = _.groupBy(data, function(item) { return  item.ga_gender; });
  //   const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
  //   this.genderGrouped = genderGrouped;
  //   console.log(groupGender);

  //   const genderObjectsArray = [];
  //   const group = Object.keys(genderGrouped);
  //   console.log(group);

  //   for (let i = 0; i < groupGender.length; i++) {
  //     genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
  //   }

  //   console.log(genderObjectsArray);

  //   const organizedByGender = genderObjectsArray.map(ele => {
  //     return new Object({kind: ele.key, share: ele.value.length});
  //   });

  //   console.log(organizedByGender);
  //   this.genderData = organizedByGender;

  // }

  // groupByArchetype(data: any) {

  //   const genderGrouped = _.groupBy(data, function(item) { return  item.archetype; });
  //   const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);

  //   const archetypesGrouped = [];
  //   const group = Object.keys(genderGrouped);


  //   for (let i = 0; i < groupGender.length; i++) {
  //     archetypesGrouped.push(new Object({key: group[i], value: groupGender[i]}));
  //   }

  //   this.genderData = archetypesGrouped;

  //   const organizedByArchetype = archetypesGrouped.map(ele => {
  //     return new Object({kind: ele.key, share: ele.value.length});
  //   });


  //   this.archetypesData = organizedByArchetype;


  // }

  // groupByPrimary(data: any) {

  //   const genderGrouped = _.groupBy(data, function(item) { return  item.primary; });
  //   const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
  //   // console.log(genderGrouped);
  //   // console.log(groupGender);

  //   const genderObjectsArray = [];
  //   const group = Object.keys(genderGrouped);
  //   // console.log(group);

  //   for (let i = 0; i < groupGender.length; i++) {
  //     // console.log(this.groupByGender[i]);
  //     genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
  //   }

  //   // console.log(genderObjectsArray);
  //   // this.genderData = genderObjectsArray;

  //   const organizedByGender = genderObjectsArray.map(ele => {
  //     return new Object({kind: ele.key, share: ele.value.length});
  //   });


  //   this.primaryData = organizedByGender;

  // }


  // drillDown(selectedItem: String) {
  //   this.drillDownSelected = true;
  //   // console.log(selectedItem);
  //   if (selectedItem === 'male') {
  //     this.gender = 'Male';
  //     const tmpData = this.genderGrouped['male'];
  //     const genderGrouped = _.groupBy(tmpData, function(item) { return  item.primary; });
  //     const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
  //     const genderObjectsArray = [];
  //     const group = Object.keys(genderGrouped);
  //     for (let i = 0; i < groupGender.length; i++) {
  //       genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
  //     }
  //     const newData = genderObjectsArray.map(ele => {
  //       return new Object({kind: ele.key, share: ele.value.length});
  //     });
  //     this.dynamicData = newData;

  //   } else if (selectedItem === 'female') {
  //     this.gender = 'Female';
  //     const tmpData = this.genderGrouped['female'];
  //     const genderGrouped = _.groupBy(tmpData, function(item) { return  item.primary; });
  //     const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
  //     const genderObjectsArray = [];
  //     const group = Object.keys(genderGrouped);
  //     for (let i = 0; i < groupGender.length; i++) {
  //       genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
  //     }
  //     const newData = genderObjectsArray.map(ele => {
  //       return new Object({kind: ele.key, share: ele.value.length});
  //     });
  //     this.dynamicData = newData;
  //   } else if (selectedItem === 'undefined') {
  //     this.gender = 'undefined';
  //     const tmpData = this.genderGrouped['undefined'];
  //     const genderGrouped = _.groupBy(tmpData, function(item) { return  item.primary; });
  //     const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
  //     const genderObjectsArray = [];
  //     const group = Object.keys(genderGrouped);
  //     for (let i = 0; i < groupGender.length; i++) {
  //       genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
  //     }
  //     const newData = genderObjectsArray.map(ele => {
  //       return new Object({kind: ele.key, share: ele.value.length});
  //     });
  //     this.dynamicData = newData;
  //   }



  // }

  // returnToGender() {
  //   this.drillDownSelected = false;
  // }

  boxClicked(x: Number, y: Number) {
    const message = 'Hello from BOX: [' + x.toString() + ',' + y.toString() + ']';
    alert(message);
    console.log('clicked', x, y);
  }

}
