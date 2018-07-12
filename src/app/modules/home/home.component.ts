import { Component, OnInit } from '@angular/core';
import { NodejsApiService } from '../../services/nodejs-api.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Key } from 'protractor';
import { IbeService } from '../../services/ibe.service';
import { Runes } from './components/grid/colrow-header/models/runes.model';
import { listAnimation } from './components/animations/listAnimate';




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
  primaryData: any;
  dynamicData: any;
  genderGrouped: any;
  drillDownSelected = false;
  cacheQuery1: Subscription;
  gender: String;

  // This is all the data needed for each tile
  allData: Subscription;
  responseData: any;
  filteredBoxData: any;

  constructor(private _nodeApi: NodejsApiService, public _IBE: IbeService) {
    this._nodeApi.allData.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    let filterKey;
    let commonArchetypes = [];
    const newArr = [];
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

    const parameters: Parameter[] = [];
    const xdc: String = '439';
    const xdcQueryName: String = 'Genders';

      if (this.cacheQuery1) {
        this.cacheQuery1.unsubscribe();
      }
      this.cacheQuery1 = this._IBE.cacheQuery(xdcQueryName, xdc, parameters).subscribe(data => {

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


// Method to filter the data
addToService(arr: any) {
 this._nodeApi.gridTileData.next(arr) ;
}
  processAllTheDatad(data: any) {
    // this.groupByGender(data);
    // this.groupByArchetype(data);
    // this.groupByPrimary(data);

    // console.log('I am here');
   this.indexedData =  data.map(row => {
      // console.log('The Primary for this record:', row.primary);
      // console.log('The Secondary for this record:',row.secondary);
      // Assign Primary Index to the data
      switch (row.primary) {
        case 'innovation':
        row.primaryIndex = 1;
        break;
        case 'passion':
        row.primaryIndex = 2;
        break;
        case 'power':
        row.primaryIndex = 3;
        break;
        case 'prestig':
        row.primaryIndex = 4;
        break;
        case 'trust':
        row.primaryIndex = 5;
        break;
        case 'mystique':
        row.primaryIndex = 6;
        break;
        case 'alert':
        row.primaryIndex = 7;
        break;
      }

      // Assign Secondary Index to the data
      // Assign Primary Index to the data
      switch (row.secondary) {
        case 'innovation':
        row.secondaryIndex = 1;
        break;
        case 'passion':
        row.secondaryIndex = 2;
        break;
        case 'power':
        row.secondaryIndex = 3;
        break;
        case 'prestige':
        row.secondaryIndex = 4;
        break;
        case 'trust':
        row.secondaryIndex = 5;
        break;
        case 'mystique':
        row.secondaryIndex = 6;
        break;
        case 'alert':
        row.secondaryIndex = 7;
        break;
      }
      return row;
    });

  }

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
    // const message = 'Hello from BOX: [' + x.toString() + ',' + y.toString() + ']';
    // alert(message);
    console.log('clicked', x, y);
  }

}
