import { Component, OnInit, Input } from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';

@Component({
  selector: 'app-colrow-header',
  templateUrl: './colrow-header.component.html',
  styleUrls: ['./colrow-header.component.scss']
})
export class ColrowHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() rune: any;

  constructor(public node: NodejsApiService) {

  }

  ngOnInit() {
  }



}
