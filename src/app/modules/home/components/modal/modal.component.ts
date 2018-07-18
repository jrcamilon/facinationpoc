import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodejsApiService } from 'src/app/services/nodejs-api.service';
import * as _ from 'lodash';
import { arch } from 'os';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  @Input() index;
  @Input() data;
  @Output() modalClose: EventEmitter<any> = new EventEmitter();

  clients: string[];

  title: string;

  primaryCategories: string[];
  primaryData: any[];
  primaryTitle = 'Primary Advantages Total Scores';

  genderCateogires: string[];
  genderData: any[];
  genderTital = 'Gender Distribution';

  advantageColors = [
    { advantage: 'innovation', color: '#EDA716'},
    { advantage: 'passion', color: '#B74A2A' },
    { advantage: 'power', color: '#82181B' },
    { advantage: 'prestige', color: '#472656'},
    { advantage: 'trust', color: '#223D6E'},
    { advantage: 'mystique', color: '#005B5D'},
    { advantage: 'alert', color: '#285A17'}
  ];


  languageOf: string;
  communication: any;
  fasicnation: any;
  otherLeaders: any;
  overview: any;
  public opened = true;


  constructor( ) {

  }

  ngOnInit() {
    // console.log(this.data);
    this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] : 'No Data';
    this.organizeChartData();
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

    this.genderCateogires = group;
    this.genderData = organizedByGender;
  }

  public getColor(_advantage: String) {
    const index = this.advantageColors.findIndex(x => x.advantage === _advantage);
    return this.advantageColors[index].color;
  }


  public close(status) {
    this.modalClose.emit();
  }

  public open() {
    this.opened = true;
  }

}
