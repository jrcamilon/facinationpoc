import { Component, OnInit } from '@angular/core';
import { NodejsApiService } from '../../services/nodejs-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _nodeApi: NodejsApiService ) { }

  ngOnInit() {
    this.showFiles();
  }
  showFiles() {
    this._nodeApi.getAllFiles().subscribe((data) => {
      console.log(data);
    });
  }


}
