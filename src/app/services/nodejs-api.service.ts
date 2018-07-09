import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  static filteredBoxData: any;
  static BoxData: any;
  public allData = new Subject<any>();

  nodeJSEndpoint = 'http://vm3.infosol.com:8012/';

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSEndpoint);
  }

  setData(data: any){
    NodejsApiService.BoxData = data;
  }
 static  getFilteredBox(key:any){
    let arr;

    
    for(let i = 0 ; i<NodejsApiService.filteredBoxData.length;i++){
    
      let row = NodejsApiService.filteredBoxData[i];
      if(row.key===key){
        return row;
      }
    }
  }
  filterData(){
    let filterKey;
    let commonArchetypes;
   

    for (let i = 1 ; i <=7 ; i++ ){
      for(let j = 1; j <= 7 ; j++){
        filterKey  = `${i}${j}`;
        commonArchetypes = [];
        for (let a = 0; a< NodejsApiService.BoxData;a++){
          let row = NodejsApiService.BoxData[a];

          if( row.key === filterKey){
            commonArchetypes.push(row);
          }
        }

        let newParsedBoxData = {key: filterKey , data: commonArchetypes};
        NodejsApiService.filteredBoxData.push(newParsedBoxData);
      }
    }

    console.log(NodejsApiService.filteredBoxData.length)
  }
  constructor(private http: HttpClient) { }
}
