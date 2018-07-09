import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Sample } from './sample'
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  //Variables
  static filteredBoxData: any = [];
  static BoxData: any;
  static responseData: any;
  public allData = new Subject<any>();
  private  nodeJSEndpoint = 'http://vm3.infosol.com:8012/';

  constructor(private http: HttpClient) {
  
  }
  //Methods

  //1st Call
  getSamples ():Observable<Sample[]>{
    return this.http.get<Sample[]>(this.nodeJSEndpoint). pipe(
      tap(samples=>NodejsApiService.responseData = samples)
    );
  }
  // 2nd Call



  static  getFilteredBox(key:any){
    let arr;

    
    for(let i = 0 ; i<NodejsApiService.filteredBoxData.length;i++){
    
      let row = NodejsApiService.filteredBoxData[i];
      if(row.key===key){
        return row;
      }
    }
  }
  getAllFiles(): Observable<Sample[]> {
    //Return data from My API
    return this.http.get<Sample[]>(this.nodeJSEndpoint)

  }
  
  setData(data: any){
    NodejsApiService.BoxData = data;
  }
  
  // Method to filter the data
  filterData(){
    let filterKey;
    let commonArchetypes;
   
    console.log(NodejsApiService.BoxData);

    for (let i = 1 ; i <=7 ; i++ ){
      for(let j = 1; j <= 7 ; j++){
        filterKey  = `${i}${j}`;
        commonArchetypes = [];
        for (let a = 0; a< NodejsApiService.BoxData.length;a++){
          let row = NodejsApiService.BoxData[a];

          if( row.key === filterKey){
            commonArchetypes.push(row);
          }
        }

        let newParsedBoxData = {key: filterKey , data: commonArchetypes};
        console.log(newParsedBoxData);
        NodejsApiService.filteredBoxData.push(newParsedBoxData);
      }
    }

    console.log(NodejsApiService.filteredBoxData.length)
  }
 
}
