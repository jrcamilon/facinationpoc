import { Component, OnInit,Input, Output } from '@angular/core';
import { NodejsApiService } from '../../../../services/nodejs-api.service';

@Component({
  selector: 'app-gridbox',
  templateUrl: './gridbox.component.html',
  styleUrls: ['./gridbox.component.scss']
})
export class GridboxComponent implements OnInit {

  @Input() primaryIndex: any;
  @Input() secondaryIndex: any;
  @Input() item: any;
  @Input() item2: any;
  @Output() content: any;

  data: any;
  advantages = [{title: '', subtitle: ''},
  {title: 'Innovation', subtitle: 'You change the game with creativity'},
  {title: 'Passion', subtitle: 'You are pretty cool'},
  {title: 'Power', subtitle: 'Forward-thinking . Entrepreneurial'},
  {title: 'Prestigue', subtitle: 'Forward-thinking . Entrepreneurial'},
  {title: 'Trust', subtitle: 'Forward-thinking . Entrepreneurial'},
  {title: 'Mystique', subtitle: 'Forward-thinking . Entrepreneurial'},
  {title: 'Alert', subtitle: 'Forward-thinking . Entrepreneurial'}];
  archetypes=[
    {key:'innovation', value:1},
    {key:'passion', value:2},
    {key:'power', value:3},
    {key:'prestige', value:4},
    {key:'trust', value:5},
    {key:'mystique', value:6},
    {key:'alert', value:7}
  ];
 indexedData = [];

 constructor(private _nodeApi: NodejsApiService) {
  // this._nodeApi.allData.subscribe((data) => {
  // });
}

  ngOnInit() {
    this.determineGridBoxType();
  }
  determineGridBoxType(){
    if((this.primaryIndex ===0 && this.secondaryIndex !== 0) ||
    (this.primaryIndex !==0 && this.secondaryIndex === 0)){
      // console.log(this.item, this.item2);
      if(this.item.title==""){
        this.content = this.item2.title+ this.item2.subtitle;

      } else {
        this.content = this.item.title+ this.item.subtitle;

      }
      // console.log("Found a header");
    } else{
      let filter = `${this.primaryIndex}${this.secondaryIndex}`;
       this.content = NodejsApiService.getFilteredBox(filter);
    }
  }
 
}
