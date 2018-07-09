import { Component } from '@angular/core';
import { NodejsApiService } from './services/nodejs-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  data  = [];
  constructor(private _nodeApi: NodejsApiService) {
    this._nodeApi.allData.subscribe((data) => {
     this.data = data;
    
    });
    this._nodeApi.setData(this.data);
    this._nodeApi.filterData();

  }
}
