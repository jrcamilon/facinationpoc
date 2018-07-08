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
  this._nodeApi.allData.subscribe((data) => {
    this.processAllTheDatad(data);
  });
}

  ngOnInit() {
    this.determineGridBoxType();
  }
  determineGridBoxType(){
    if((this.primaryIndex ===0 && this.secondaryIndex !== 0) ||
    (this.primaryIndex !==0 && this.secondaryIndex === 0)){
      console.log(this.item, this.item2);
      if(this.item.title==""){
        this.content = {title:this.item2.title, subtitle:this.item2.subtitle, type:"header"}

      } else {
        this.content = {title:this.item.title, subtitle:this.item.subtitle, type:"header"}

      }
      // console.log("Found a header");
    } else{
      console.log("")
      for(let i=0;i<this.indexedData.length;i++){
        let row = this.indexedData[i];
        if(row.primaryIndex === this.primaryIndex && this.secondaryIndex ===row.secondary){
          
        }
      }
      // console.log("found a data point");
    }
  }
  processAllTheDatad(data: any) {
    // this.groupByGender(data);
    // this.groupByArchetype(data);
    // this.groupByPrimary(data);

    // console.log('I am here');
   this.indexedData =  data.map(row=>{
      // console.log('The Primary for this record:', row.primary);
      // console.log('The Secondary for this record:',row.secondary);
      //Assign Primary Index to the data
      switch(row.primary) {
        case "innovation":
        row.primaryIndex = 1;
        break;
        case "passion":
        row.primaryIndex = 2;        
        break;
        case "power":
        row.primaryIndex = 3;        
        break;
        case "prestige":
        row.primaryIndex = 4;        
        break;
        case "trust":
        row.primaryIndex = 5;                
        break;
        case "mystique":
        row.primaryIndex = 6;                
        break;
        case "alert":
        row.primaryIndex = 7;              
        break;
      }

      //Assign Secondary Index to the data
      //Assign Primary Index to the data
      switch(row.secondary) {
        case "innovation":
        row.secondaryIndex = 1;
        break;
        case "passion":
        row.secondaryIndex = 2;        
        break;
        case "power":
        row.secondaryIndex = 3;        
        break;
        case "prestige":
        row.secondaryIndex = 4;        
        break;
        case "trust":
        row.secondaryIndex = 5;                
        break;
        case "mystique":
        row.secondaryIndex = 6;                
        break;
        case "alert":
        row.secondaryIndex = 7;              
        break;
      }
      return row;
      
    });
  }
}
