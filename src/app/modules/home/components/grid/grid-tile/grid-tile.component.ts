import { Component, OnInit, Input } from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';

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

  boxNumber: string;
  dataLocal: any;

  constructor(private node: NodejsApiService) {
    this.node.gridTileData.subscribe(data => {
      // console.log(data);
      const index = data.findIndex(x => x.key === this.boxNumber);
      this.dataLocal = data[index]['data'].length;
    });
  }

  ngOnInit() {

    this.boxNumber = this.x.toString() + this.y.toString();
    // console.log('component', this.boxNumber + ' initialized');
    // this.getDataForLocal();


  }

  // getDataForLocal() {
  //   const index = this.data.findIndex(x => x.key === this.boxNumber);
  //   this.dataLocal = this.data[index]['data'];
  // }
  

}
