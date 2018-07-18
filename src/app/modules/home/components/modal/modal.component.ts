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

    const data = [total['innovation'], total['passion'], total['power'],
    total['prestige'], total['trust'], total['mystique'], total['alert'] ];

    console.log(_advantages);
    console.log(data);

    this.primaryCategories = _advantages;
    this.primaryData = data;

    console.log(this.data);
    console.log(this.index[0]);
    this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] + " - " : 'No Data';
    const archIndex = _.findIndex(NodejsApiService.archetypeData, (a) => a.boxkey === this.index)
    this.title += NodejsApiService.archetypeData[archIndex].adjectives;

    const dataIndex = _.findIndex(NodejsApiService.boxPrimaryData, (a) => a.key === this.index[0])
    const primaryData =  NodejsApiService.boxPrimaryData[dataIndex];

    this.languageOf = primaryData.languageOf;
    this.communication = primaryData.communication;
    this.fasicnation = primaryData.fascination;
    this.otherLeaders = primaryData.otherLeaders;
    this.overview = primaryData.overview;

  }


  public close(status) {
    this.modalClose.emit();
  }

  public open() {
    this.opened = true;
  }

}
