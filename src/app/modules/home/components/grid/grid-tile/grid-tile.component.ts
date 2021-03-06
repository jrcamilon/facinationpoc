import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';
import { archetypes } from './models/archetypes';



@Component({
  selector: 'app-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
/*
  This component gets initialized 49 times, number of tiles needed.
  each box gets its number from the x and y inputs.
  then it create a key aka 'box11' etc. and uses that key
  to search through the data being passed down.
  probably be better to pass all the data to service from hom
  then each component gets the data with appropriate key.
*/

export class GridTileComponent implements OnInit {

  // @Input() data: any;
  @Input() x: any;
  @Input() y: any;
  @Output() openClose: EventEmitter<any> = new EventEmitter();

  boxNumber: string;
  boxId: string;
  dataLocal: any;
  archetype: string;

  showBack =  false;

  constructor(private node: NodejsApiService) {
    this.node.gridTileData.subscribe(data => {

      const index = data.findIndex(x => x.key === this.boxNumber);
      this.dataLocal = data[index]['data'].length;
      this.archetype = data[index]['data'].length === 0 ? 'N/A' : data[index]['data'][0].archetype;
    });
  }


  ngOnInit() {
    this.boxNumber = this.x.toString() + this.y.toString();
    this.boxId = 'box' + this.boxNumber;
  }

  public onBoxClick() {
    console.log('clicked open back');
    this.showBack = !this.showBack;
  }

}
