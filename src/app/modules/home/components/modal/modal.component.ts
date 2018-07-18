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
  @Output() barData: any = [];
  @Output() modalClose: EventEmitter<any> = new EventEmitter();

  clients: string[];

  title: string;
  languageOf: string
  communication: any;
  fasicnation: any;
  otherLeaders: any;
  overview: any;
  public opened = true;


  constructor( ) {

  }

  ngOnInit() {
    console.log(this.data);
    console.log(this.index[0]);
    this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] + " - " : 'No Data';
    let archIndex = _.findIndex(NodejsApiService.archetypeData,(a) => { return a.boxkey == this.index})
    this.title +=NodejsApiService.archetypeData[archIndex].adjectives;

    let dataIndex = _.findIndex(NodejsApiService.boxPrimaryData,(a) => { return a.key==this.index[0]})
    let primaryData =  NodejsApiService.boxPrimaryData[dataIndex];

    this.languageOf = primaryData.languageOf;
    this.communication = primaryData.communication;
     this.fasicnation= primaryData.fascination;
    this.otherLeaders = primaryData.otherLeaders;
     this.overview= primaryData.overview 
     
    this.createBoxBarChartData()

   
  }

  createBoxBarChartData(){
    let innovation = _.sumBy(this.data,(a)=>{return a.innovation});
    let passion = _.sumBy(this.data,(a)=>{return a.passion});
    let power = _.sumBy(this.data,(a)=>{return a.power});
    let prestige = _.sumBy(this.data,(a)=>{return a.prestige});
    let trust = _.sumBy(this.data,(a)=>{return a.trust});
    let mystique = _.sumBy(this.data,(a)=>{return a.mystique});
    let alert = _.sumBy(this.data,(a)=>{return a.alert});
    this.barData.push(innovation,passion,power,prestige,trust,mystique,alert);


  }

  public close(status) {
    this.modalClose.emit();
  }

  public open() {
    this.opened = true;
  }

}
