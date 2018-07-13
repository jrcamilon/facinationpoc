import { Component, OnInit, Input } from '@angular/core';
import { NodejsApiService } from '../../../../../services/nodejs-api.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

 
  @Input() isPrimary: any;

  public data: any =[
    { Advantage: "Passion"   , Total: 15  },
    { Advantage: "Innovation", Total: 2   },
    { Advantage: "Power"     , Total: 4  },
    { Advantage: "Trust"     , Total: 7  },
    { Advantage: "Prestige"  , Total: 13  },
    { Advantage: "Alert"     , Total: 11  },
    { Advantage: "Mystique"  , Total: 9  }   
  ]; 
  public title: any ="Hello";
  public showAll: any = true;
  public boxKeyFilter: any;
  public showPrimary: any = true;


  constructor(private _nodeApi: NodejsApiService) {
  
    
  }
  ngOnInit(){   

  } 
  public labelContent(e: any): string {      return `${ e.dataItem.time.substring(0, 2) }h`;
  }

}
