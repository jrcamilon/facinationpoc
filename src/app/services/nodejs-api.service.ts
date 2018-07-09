import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  public allData = new Subject<any>();
  public gridTileData = new Subject<any>();

  nodeJSEndpoint = 'http://vm3.infosol.com:8012/';

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSEndpoint);
  }

  public getGridTileData(boxNumber: string) {
    // const index = this.gridTileData.findIndex(x => x.key === boxNumber);
    // return this.gridTileData[index]['data'];
  }

  passData(data): any {
    console.log(data);
    console.log('data in service');
    this.gridTileData = data;
  }

  constructor(private http: HttpClient) { }

}
