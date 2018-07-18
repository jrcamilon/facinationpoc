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


  public opened = true;


  constructor( ) {

  }

  ngOnInit() {
    console.log(this.data);
    this.title = this.data[0]['archetype'] !== undefined ? this.data[0]['archetype'] + " - " : 'No Data';
    let archIndex = _.findIndex(NodejsApiService.archetypeData,(a) => { return a.boxkey == this.index})
    this.title +=NodejsApiService.archetypeData[archIndex].adjectives;
    console.log(this.title);
  }


  public close(status) {
    this.modalClose.emit();
  }

  public open() {
    this.opened = true;
  }

}
