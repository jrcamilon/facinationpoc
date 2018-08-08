import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodejsApiService } from 'src/app/services/nodejs-api.service';
import * as _ from 'lodash';
import { arch } from 'os';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { products } from './products';
import { process, orderBy, filterBy, /* etc...*/ } from '@progress/kendo-data-query';
import { RowArgs } from '@progress/kendo-angular-grid';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { SeriesLabels } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() index;
  @Input() data;
  @Output() modalClose: EventEmitter<any> = new EventEmitter();
  public seriesLabels: SeriesLabels = {
    visible: true, // Note that visible defaults to false
    padding: 3,
    font: 'bold 12px Arial, sans-serif'
  };
  // Grid View
  public gridView: GridDataResult;
  public items: any[] = products;
  public mySelection: number[] = [];
  public pageSize = 10;
  public skip = 0;
  public totalMales: any;
  public totalFemales: any;
  public totalOthers: any;
  public innovation: any = false;
  public passion: any = false;
  public power: any = false;
  public prestige: any = false;
  public trust: any = false;
  public mystique: any = false;
  public alert: any = false;
  public opened = true;
  public videoBox = false;

  public genderSeriesColors: any = [];

  public apiGenderData: any = [];
  conferenceData: any = [];
  organizationData: any = [];
  boxData: any = [];
  clients: string[];
  title: string;
  primaryCategories: string[];
  primaryData: any[];
  primaryTitle = 'Advantages Total Scores';
  primaryIndividualCategories: string[];
  primaryIndividualData: any[];
  primaryIndividualTitle: string;
  archetype: string;
  genderCateogires: string[];
  genderData: any[];
  genderTital = 'Gender Distribution';

  conferenceArrScores = [];
  organizationArrScores = [];
  boxArrScores = [];

  advantageColors = [
    { advantage: 'innovation', color: '#EDA716', videoBox: '10'},
    { advantage: 'passion', color: '#B74A2A', videoBox: '20'},
    { advantage: 'power', color: '#82181B', videoBox: '30'},
    { advantage: 'prestige', color: '#472656', videoBox: '40'},
    { advantage: 'trust', color: '#223D6E', videoBox: '50'},
    { advantage: 'mystique', color: '#005B5D', videoBox: '60'},
    { advantage: 'alert', color: '#285A17', videoBox: '70'}
  ];
  languageOf: string;
  communication: any;
  fasicnation: any;
  otherLeaders: any;
  overview: any;
  primaryBoxesForVideo = ['10', '20', '30', '40', '50', '60', '70'];
  videoBoxTitle: string;
  // Indiviudal Scores
  primaryAndSecondaryScoresArray: any[];
  primaryPercentage: Number;
  secondaryPercentage: Number;
  dormantAdvantage: String;
  // totals for gender
  conferenceTotals: number [];
  organizationTotals: Number;
  boxTotals: Number;

  constructor( _nodeApi: NodejsApiService ) {
    _nodeApi.genderCounts.subscribe(data => {
      this.apiGenderData = data;
      // console.log(data);

      // let sortedConference = _.orderBy(data.conference,['gender'],['asc']);
      // let sortedOrganization = _.orderBy(data.organization,['gender'],['asc']);
      // let sortedBox = _.orderBy(data.box,['gender'],['asc']);

      const conference = _.groupBy(data['conference'], function(ele) { return ele['gender']; });
      const organization = _.groupBy(data['organization'], function(ele) { return ele['gender']; });
      const box = _.groupBy(data['box'], function(ele) { return ele['gender']; });

      const conferenceCleaned = JSON.parse(JSON.stringify(conference).replace(/\s/g, ''));
      const organizationCleaned = JSON.parse(JSON.stringify(organization).replace(/\s/g, ''));
      const boxCleaned = JSON.parse(JSON.stringify(box).replace(/\s/g, ''));

      const confOther = conferenceCleaned['Other'] === undefined ? 0 : conferenceCleaned['Other'][0]['Value'];
      const confFemale = conferenceCleaned['female'] === undefined ? 0 : conferenceCleaned['female'][0]['Value'];
      const confMale = conferenceCleaned['male'] === undefined ? 0 : conferenceCleaned['male'][0]['Value'];

      const orgOther = organizationCleaned['Other'] === undefined ? 0 : organizationCleaned['Other'][0]['Value'];
      const orgMale = organizationCleaned['male'] === undefined ? 0 : organizationCleaned['male'][0]['Value'];
      const orgFemale = organizationCleaned['female'] === undefined ? 0 : organizationCleaned['female'][0]['Value'];
      const boxOther = boxCleaned['Other'] === undefined ? 0 : boxCleaned['Other'][0]['Value'];
      const boxFemale = boxCleaned['female'] === undefined ? 0 : boxCleaned['female'][0]['Value'];
      const boxMale = boxCleaned['male'] === undefined ? 0 : boxCleaned['male'][0]['Value'];

      this.conferenceData.push(new Object({Type: 'Conference', Total: confFemale , color: '#711331'}));
      this.conferenceData.push(new Object({Type: 'Conference', Total: confMale , color: '#172457'}));
      this.conferenceData.push(new Object({Type: 'Conference', Total: confOther , color: '#567714'}));
      this.conferenceArrScores.push(confFemale, confMale, confOther);

      this.organizationData.push(new Object({Type: 'Organization', Total: orgFemale , color: '#973252'}));
      this.organizationData.push(new Object({Type: 'Organization', Total: orgMale , color: '#303C74'}));
      this.organizationData.push(new Object({Type: 'Organization', Total: orgOther , color: '#7A9F35'}));
      this.organizationArrScores.push(orgFemale, orgMale, orgOther);

      this.boxData.push(new Object({Type: 'Other', Total: boxFemale , color: '#BD5E7C'}));
      this.boxData.push(new Object({Type: 'Other', Total: boxMale , color: '#7B84AE'}));
      this.boxData.push(new Object({Type: 'Other', Total: boxOther , color: '#A5C663'}));
      this.boxArrScores.push(boxFemale, boxMale, boxOther);

      console.log(this.conferenceData);
      console.log(this.organizationData);
      console.log(this.boxData);

      // for (let i = 0; i < 4 ; i++) {

      //   if (sortedConference[i]!== undefined) {
      //   let str = sortedConference[i].gender.replace(/\s/g, '');

      //     switch (str) {
      //       case "male":
      //       // console.log("found a male");
      //       this.conferenceData.splice(1,0,{Type: "Conference","Total":sortedConference[i].Value , color: '#172457'});
      //       this.conferenceArrScores.push(sortedConference[i].Value);
      //       break
      //       case "female":
      //       // this.conferenceData.push((data.conference[i]==undefined)? 0: data.conference[i].Value);
      //       this.conferenceData.splice(0,0, {Type: "Conference","Total":sortedConference[i].Value, color: '#711331'});
      //       this.conferenceArrScores.push(sortedConference[i].Value);

      //       break;
      //       case "Other":
      //       this.conferenceData.splice(2,0, {Type: "Conference","Total":sortedConference[i].Value, color: '#567714'});
      //       this.conferenceArrScores.push(sortedConference[i].Value);

      //       // this.conferenceData.push((data.conference[i]==undefined)? 0: data.conference[i].Value);
      //     }

      //   }
      // // shades of blue
      // // 172457, 303C74, 7B84AE

      // // shades of pink
      // // 711331, 973252, BD5E7C

      // // shades of green
      // // 567714, 7A9F35, A5C663

      //   if(sortedOrganization[i]!=undefined){
      //     let str1 = sortedOrganization[i].gender.replace(/\s/g, '');

      //     switch(str1){
      //       case "male":
      //       this.organizationData.splice(1,0, {Type: "Organization","Total":sortedOrganization[i].Value, color: '#303C74'});
      //       this.organizationArrScores.push(sortedOrganization[i].Value);
      //       break
      //       case "female":
      //       this.organizationData.splice(0,0,{Type: "Organization","Total":sortedOrganization[i].Value, color: '#973252'});
      //       this.organizationArrScores.push(sortedOrganization[i].Value);
      //       break;
      //       case "Other":
      //       this.organizationData.splice(2,0, {Type: "Organization","Total":sortedOrganization[i].Value, color: '#7A9F35'});
      //       this.organizationArrScores.push(sortedOrganization[i].Value);
      //     }
      //   }


      //   if(sortedBox[i]!=undefined){
      //   let str2 = sortedBox[i].gender.replace(/\s/g, '');

      //     switch(str2){
      //       case "male":
      //       this.boxData.splice(1,0,{Type: "Archetype","Total":sortedBox[i].Value, color: '#7B84AE'});
      //       this.boxArrScores.push(sortedBox[i].Value);
      //       break
      //       case "female":
      //       this.boxData.splice(0,0,{Type: "Archetype","Total":sortedBox[i].Value, color: '#BD5E7C'});
      //       this.boxArrScores.push(sortedBox[i].Value);
      //       break;
      //       case "Other":
      //       this.boxData.splice(2,0,{Type: "Archetype","Total":sortedBox[i].Value, color: '#A5C663'});
      //       this.boxArrScores.push(sortedBox[i].Value);
      //     }
      // }
      // // // Get Females
      // // this.conferenceData.push((data.conference[0]==undefined)? 0: data.conference[1].Value);
      // // this.organizationData.push((data.organization[2]==undefined)? 0: data.conference[2].Value);
      // // this.boxData.push((data.box[3]==undefined)? 0: data.conference[3].Value);

      // //   // Get males
      // //   this.conferenceData.push((data.conference[2]==undefined)? 0: data.conference[2].Value);
      // //   this.organizationData.push((data.organization[1]==undefined)? 0: data.conference[1].Value);
      // //   this.boxData.push((data.box[1]==undefined)? 0: data.conference[1].Value);

      // //   // Get Others
      //   // this.conferenceData.push((data.conference[1]==undefined)? 0: data.conference[1].Value);
      //   // this.organizationData.push((data.organization[1]==undefined)? 0: data.conference[1].Value);
      //   // this.boxData.push((data.box[2]==undefined)? 0: data.conference[2].Value);
    // }

    });
  }

  public getConferencePercentage(value: number) {
    return (value / this.conferenceArrScores.reduce((a, b) => a + b, 0)) * 100;
  }

  public getOrganizationPercentage(value: number) {
    return (value / this.organizationArrScores.reduce((a, b) => a + b, 0)) * 100;
  }

  public getBoxPercentage(value: number) {
    return (value / this.boxArrScores.reduce((a, b) => a + b, 0)) * 100;
  }



  ngOnInit() {
    if (this.primaryBoxesForVideo.includes(this.index)) {
      this.videoBox = true;
      const i = this.advantageColors.findIndex(ele => ele.videoBox === this.index);
      this.videoBoxTitle = this.advantageColors[i]['advantage'];
    } else {
      this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] : 'No Data';
      this.archetype = this.title;
      this.organizeChartData();
      this.loadItems();
      // Method to set the header type
      this.getTitleHeaderColor();
    }

  }

  public organizeChartData() {

    /* Get the total of all the advantages for each object in the modal data*/
    const _advantages = ['innovation', 'passion', 'power', 'prestige', 'trust', 'mystique', 'alert'];
    const total = {};
    _.each(this.data, function (item) { _.each(_advantages, function (adv) {
        total[adv] = (total[adv] || 0) + item[adv];
      });
    });
    const objArray = _.map(total, function(v, k, a) { return _.pick(a, k); });
    const dataWithColors = objArray.map(ele => {
      return new Object({value: Object.values(ele)[0], color: this.getColor(Object.keys(ele)[0])});
    });

    const categories = objArray.map(ele => {
      return Object.keys(ele)[0];
    });

    // assignt the primary categories and data with colors to pass to the bar graph
    this.primaryCategories = categories;
    this.primaryData = dataWithColors;

    this.organizeByGender();

    // set title and other data related to the archetype
    this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] + ' - ' : 'No Data';
    const archIndex = _.findIndex(NodejsApiService.archetypeData, (a) => a.boxkey == this.index );
    this.title += NodejsApiService.archetypeData[archIndex].adjectives;

    const dataIndex = _.findIndex(NodejsApiService.boxPrimaryData, (a) => a.key == this.index[0] );
    const primaryData =  NodejsApiService.boxPrimaryData[dataIndex];

    this.languageOf = primaryData.languageOf;
    this.communication = primaryData.communication;
    this.fasicnation = primaryData.fascination;
    this.otherLeaders = primaryData.otherLeaders;
    this.overview = primaryData.overview;

  }


  public organizeByGender() {


    // Cleanup for trailing and leading spaces in object keys
    const cleaned = this.data.map( ele => {
      ele['gender']  = ele['gender'].trim();
      return ele;
    });


    const genderGrouped = _.groupBy(cleaned, function(item) { return  item.gender; });
    const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);

    const genderObjectsArray = [];
    const group = Object.keys(genderGrouped);
    for (let i = 0; i < groupGender.length; i++) {
      genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
    }
    const organizedByGender = genderObjectsArray.map(ele => {

      if (ele.key !== 'Other' ) {
        return new Object({value: ele.value.length, color: ele.key === 'male' ? '#003F7F' : '#FF017E'});
      } else {
      return new Object({value: ele.value.length, color: 'green' });
      }
    });


    this.genderCateogires = group;
    this.genderData = organizedByGender;

    if (genderGrouped['male'] === undefined){
       this.totalMales = 0;
    } else {
      this.totalMales = genderGrouped['male'].length;
    }
    if (genderGrouped['female'] === undefined){
      this.totalFemales = 0;
   } else {
     this.totalFemales = genderGrouped['female'].length;
   }
   if (genderGrouped['Other'] === undefined){
    this.totalOthers = 0;
  } else {
    this.totalOthers = genderGrouped['Other'].length;
  }



    //     console.log(genderGrouped);
    // if (this.genderData[1] !== undefined) {
    //   this.totalMales = genderGrouped['male'].length;
    // } else {
    //   this.totalMales = 0;
    // }
    // if (this.genderData[0] !== undefined) {
    // this.totalFemales = genderGrouped['female'].length;
    // } else {
    //   this.totalFemales = 0;
    // }
    // if (this.genderData[2] !== undefined) {
    //   this.totalOthers = genderGrouped['Other'].length;
    // }  else {
    //   this.totalOthers = 0;
    // }
}


  public getColor(_advantage: String) {
    const index = this.advantageColors.findIndex(x => x.advantage === _advantage);
    return this.advantageColors[index].color;
  }

  private getTitleHeaderColor () {
    switch (this.index[0]) {
      case '1':
      this.innovation = true;
      this.genderSeriesColors = ['#663300', '#666699', '#EDA716'];
      break;
      case '2':
      this.passion = true;
      this.genderSeriesColors = ['#663300', '#666699', '#B74A2A'];
      break;
      case '3':
      this.power = true;
      this.genderSeriesColors = ['#663300', '#666699', '#82181B'];
      break;
      case '4':
      this.prestige = true;
      this.genderSeriesColors = ['#663300', '#666699', '#472656'];
      break;
      case '5':
      this.trust = true;
      this.genderSeriesColors = ['#663300', '#666699', '#223D6E'];
      break;
      case '6':
      this.mystique = true;
      this.genderSeriesColors = ['#663300', '#666699', '#005B5D'];
      break;
      case '7':
      this.alert = true;
      this.genderSeriesColors = ['#663300', '#666699', '#285A17'];
      break;
    }
  }

  public close(status) {
    this.modalClose.emit();
  }

  public open() {
    this.opened = true;
  }

  public onTabSelect(e) {
    // console.log(e);
  }

  private loadItems(): void {
    this.gridView = {
        data: this.data.slice(this.skip, this.skip + this.pageSize),
        total: this.data.length
    };

    this.loadSelectedUser(0);
  }

  /* this is for the user select */
  public loadSelectedUser(row: any) {

    // const index = row;
    const userSpecificData = this.data[row];
    // const userSpecificData = this.data[0];

    const _advantages = ['innovation', 'passion', 'power', 'prestige', 'trust', 'mystique', 'alert'];
    const total = {};

    const dataWithColors = _advantages.map(ele => {
      return new Object({value: userSpecificData[ele], color: this.getColor(ele)});
    });

    const primaryAdvantage = userSpecificData['primaryAdvantage'];
    const secondaryAdvantage = userSpecificData['secondaryAdvantage'];

    const pScore = userSpecificData[primaryAdvantage];
    const sScore = userSpecificData[secondaryAdvantage];

    const pObj = new Object({type: primaryAdvantage, value: pScore, color: this.getColor(primaryAdvantage)});
    const sObj = new Object({type: secondaryAdvantage, value: sScore, color: this.getColor(secondaryAdvantage)});

    const objArray = new Array([pObj, sObj]);
    const primaryScore = objArray[0][0]['value'];
    const secondaryScore = objArray[0][1]['value'];
    const total2 = primaryScore + secondaryScore;

    this.primaryPercentage = primaryScore / total2;
    this.secondaryPercentage = secondaryScore / total2;
    this.primaryAndSecondaryScoresArray = objArray[0];

    this.primaryIndividualCategories = _advantages;
    this.primaryIndividualData = dataWithColors;
    this.primaryIndividualTitle = userSpecificData['fuserid'] + ' Scores';
    this.dormantAdvantage = userSpecificData['dormantAdvantage'];
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();

  }

  public selected(event: Selection) {

    this.loadSelectedUser(event['index']);

  }
}
