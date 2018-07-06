import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss']
})
export class FunnelComponent implements OnInit {

  @Input() model;
  constructor() { }

  ngOnInit() {
  }

}
