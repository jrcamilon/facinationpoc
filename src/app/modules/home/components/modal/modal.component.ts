import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodejsApiService } from 'src/app/services/nodejs-api.service';
import * as _ from 'lodash';
import { arch } from 'os';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { products } from './products';
import { process, orderBy, filterBy, /* etc...*/ } from '@progress/kendo-data-query';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  // Grid View
  public gridView: GridDataResult;
  public items: any[] = products;
  public mySelection: number[] = [];
  public pageSize = 10;
  public skip = 0;
  public totalMales: any;
  public totalFemales: any;

  @Input() index;
  @Input() data;
  @Output() modalClose: EventEmitter<any> = new EventEmitter();

  clients: string[];
  title: string;

 public innovation: any = false;
 public passion: any = false;
 public power: any = false;
 public prestige: any = false;
 public trust: any = false;
  public mystique: any = false;
  public alert: any = false;

  primaryCategories: string[];
  primaryData: any[];
  primaryTitle = 'Primary Advantages Total Scores';
  primaryIndividualCategories: string[];
  primaryIndividualData: any[];
  primaryIndividualTitle: string;

  archetype: string;

  genderCateogires: string[];
  genderData: any[];
  genderTital = 'Gender Distribution';

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
  public opened = true;


  public videoBox = false;
  primaryBoxesForVideo = ['10', '20', '30', '40', '50', '60', '70'];
  videoBoxTitle: string;

  constructor( ) {

  }

  ngOnInit() {
    //  console.log(this.data);
    console.log(this.index);
    if (this.primaryBoxesForVideo.includes(this.index)) {
      console.log('video box');
      this.videoBox = true;
      const i = this.advantageColors.findIndex(ele => ele.videoBox === this.index);
      this.videoBoxTitle = this.advantageColors[i]['advantage'];
      console.log(this.videoBoxTitle);

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
    this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] + " - " : 'No Data';
    const archIndex = _.findIndex(NodejsApiService.archetypeData, (a) => a.boxkey == this.index)
    this.title += NodejsApiService.archetypeData[archIndex].adjectives;

    const dataIndex = _.findIndex(NodejsApiService.boxPrimaryData, (a) => a.key == this.index[0])
    const primaryData =  NodejsApiService.boxPrimaryData[dataIndex];

    this.languageOf = primaryData.languageOf;
    this.communication = primaryData.communication;
    this.fasicnation = primaryData.fascination;
    this.otherLeaders = primaryData.otherLeaders;
    this.overview = primaryData.overview;

  }

  public organizeByGender() {
    const genderGrouped = _.groupBy(this.data, function(item) { return  item.gender; });
    const groupGender = Object.keys(genderGrouped).map(i => genderGrouped[i]);

    
    const genderObjectsArray = [];
    const group = Object.keys(genderGrouped);

    for (let i = 0; i < groupGender.length; i++) {
      genderObjectsArray.push(new Object({key: group[i], value: groupGender[i]}));
    }

    const organizedByGender = genderObjectsArray.map(ele => {
      return new Object({value: ele.value.length, color: ele.key === 'male' ? '#003F7F' : '#FF017E'});
    });
    // console.log(organizedByGender);


    this.genderCateogires = group;
    this.genderData = organizedByGender;
    console.log(this.genderData);
    if(this.genderData[1] != undefined){
      this.totalMales = this.genderData[1].value;

    }
    else{
      this.totalMales = 0;
    }
     if(this.genderData[0] != undefined){
    this.totalFemales = this.genderData[0].value;
  }
  else{
    this.totalFemales = 0;
  }
}

  public getColor(_advantage: String) {
    const index = this.advantageColors.findIndex(x => x.advantage === _advantage);
    return this.advantageColors[index].color;
  }


  private getTitleHeaderColor () {
    // console.log("switching",this.index[0])
    switch(this.index[0]){
      case '1':
      this.innovation = true;
      console.log("Innovation is true");
      break;
      case '2':
      this.passion = true;
      break;
      case '3':
      this.power = true;
      break;
      case '4':
      this.prestige = true;
      break;
      case '5':
      this.trust = true;
      break;
      case '6':
      this.mystique = true;
      break;
      case '7':
      this.alert = true;
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
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();

    // Optionally, clear the selection when paging
    // this.mySelection = [];
  }

  public selected(event: Selection) {
    const index = event['index'];
    const userSpecificData = this.data[index];
    console.log(userSpecificData);

    const _advantages = ['innovation', 'passion', 'power', 'prestige', 'trust', 'mystique', 'alert'];
    const total = {};
    const dataWithColors = _advantages.map(ele => {
      return new Object({value: userSpecificData[ele], color: this.getColor(ele)});
    });

    this.primaryIndividualCategories = _advantages;
    this.primaryIndividualData = dataWithColors;
    this.primaryIndividualTitle = userSpecificData['fUserId'] + ' Scores';

  }


}
