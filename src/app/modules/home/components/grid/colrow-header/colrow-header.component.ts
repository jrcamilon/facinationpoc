import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-colrow-header',
  templateUrl: './colrow-header.component.html',
  styleUrls: ['./colrow-header.component.scss']
})
export class ColrowHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;


  constructor() {
    console.log('colrow header initialized');
  }

  ngOnInit() {
  }

}
