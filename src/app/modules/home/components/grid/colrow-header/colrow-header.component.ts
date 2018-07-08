import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-colrow-header',
  templateUrl: './colrow-header.component.html',
  styleUrls: ['./colrow-header.component.scss']
})
export class ColrowHeaderComponent implements OnInit {


  @Input() type: any;
  @Input() content: any;

  boxContent: any;
  constructor() { }

  ngOnInit() {
    // if(this.type==="header"){
    //   this.content = this.title + "<br /> "+this.subtitle
    // } else {
    //   this.boxContent = this.content.map(obj =>{
    //     return obj.primary;
    //   }) ;
    // }

    if(this.content.type=="header" && this.content.title!="" && this.content.subtitle!=""){
      this.boxContent = this.content.title +"\n"  + this.content.subtitle;
    } else{
      this.boxContent = this.content;

    }
  }

}
