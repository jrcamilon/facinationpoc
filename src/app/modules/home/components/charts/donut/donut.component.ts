import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { data } from './donut-mock-data';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  @Input() data: any;
  @Output() selected: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  public labelContent(e: any): string {
    // console.log(e.category);
    return e.category;
  }

  itemClicked(e: any) {
    // console.log(e.category);
    this.selected.emit(e.category);
  }


}
