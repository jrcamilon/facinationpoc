import { Component, OnInit } from '@angular/core';
import { NodejsApiService } from '../../services/nodejs-api.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { Key } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // dataLocal: any;
  genderData: any;
  archetypesData: any;
  primaryData: any;
  dynamicData: any;
  genderGrouped: any;
  drillDownSelected = false;

  gender: String;

  allData: Subscription;


  constructor(private _nodeApi: NodejsApiService ) {
    this._nodeApi.allData.subscribe((data) => {
      this.processAllTheDatad(data);
    });

  }

  ngOnInit() {
    this._nodeApi.getAllFiles().subscribe((data) => {
      // console.log(data);
      this._nodeApi.allData.next(data);
    });
  }

  processAllTheDatad(data: any) {
    this.groupByGender(data);
    this.groupByArchetype(data);
    this.groupByPrimary(data);
  }

  groupByGender(data: any) {

    const genderGrouped = _.groupBy(data, function(item) { return  item.ga_gender; });
    const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
    this.genderGrouped = genderGrouped;
    console.log(groupGender);

    const genderObjectsArray = [];
    const group = Object.keys(genderGrouped);
    console.log(group);

    for (let i = 0; i < groupGender.length; i++) {
      // console.log(this.groupByGender[i]);
      genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
    }

    console.log(genderObjectsArray);
    // this.genderData = genderObjectsArray;

    const organizedByGender = genderObjectsArray.map(ele => {
      return new Object({kind: ele.key, share: ele.value.length});
    });

    console.log(organizedByGender);
    this.genderData = organizedByGender;

  }

  groupByArchetype(data: any) {

    const genderGrouped = _.groupBy(data, function(item) { return  item.archetype; });
    const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
    // console.log(genderGrouped);
    // console.log(groupGender);

    const genderObjectsArray = [];
    const group = Object.keys(genderGrouped);
    // console.log(group);

    for (let i = 0; i < groupGender.length; i++) {
      // console.log(this.groupByGender[i]);
      genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
    }


    // this.genderData = genderObjectsArray;

    const organizedByGender = genderObjectsArray.map(ele => {
      return new Object({kind: ele.key, share: ele.value.length});
    });


    this.archetypesData = organizedByGender;

  }

  groupByPrimary(data: any) {

    const genderGrouped = _.groupBy(data, function(item) { return  item.primary; });
    const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
    // console.log(genderGrouped);
    // console.log(groupGender);

    const genderObjectsArray = [];
    const group = Object.keys(genderGrouped);
    // console.log(group);

    for (let i = 0; i < groupGender.length; i++) {
      // console.log(this.groupByGender[i]);
      genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
    }

    // console.log(genderObjectsArray);
    // this.genderData = genderObjectsArray;

    const organizedByGender = genderObjectsArray.map(ele => {
      return new Object({kind: ele.key, share: ele.value.length});
    });


    this.primaryData = organizedByGender;

  }


  drillDown(selectedItem: String) {
    this.drillDownSelected = true;
    // console.log(selectedItem);
    if (selectedItem === 'male') {
      this.gender = 'Male';
      const tmpData = this.genderGrouped['male'];
      const genderGrouped = _.groupBy(tmpData, function(item) { return  item.primary; });
      const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
      const genderObjectsArray = [];
      const group = Object.keys(genderGrouped);
      for (let i = 0; i < groupGender.length; i++) {
        genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
      }
      const newData = genderObjectsArray.map(ele => {
        return new Object({kind: ele.key, share: ele.value.length});
      });
      this.dynamicData = newData;

    } else if (selectedItem === 'female') {
      this.gender = 'Female';
      const tmpData = this.genderGrouped['female'];
      const genderGrouped = _.groupBy(tmpData, function(item) { return  item.primary; });
      const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
      const genderObjectsArray = [];
      const group = Object.keys(genderGrouped);
      for (let i = 0; i < groupGender.length; i++) {
        genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
      }
      const newData = genderObjectsArray.map(ele => {
        return new Object({kind: ele.key, share: ele.value.length});
      });
      this.dynamicData = newData;
    } else if (selectedItem === 'undefined') {
      this.gender = 'undefined';
      const tmpData = this.genderGrouped['undefined'];
      const genderGrouped = _.groupBy(tmpData, function(item) { return  item.primary; });
      const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);
      const genderObjectsArray = [];
      const group = Object.keys(genderGrouped);
      for (let i = 0; i < groupGender.length; i++) {
        genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
      }
      const newData = genderObjectsArray.map(ele => {
        return new Object({kind: ele.key, share: ele.value.length});
      });
      this.dynamicData = newData;
    }



  }

  returnToGender() {
    this.drillDownSelected = false;
  }






}
