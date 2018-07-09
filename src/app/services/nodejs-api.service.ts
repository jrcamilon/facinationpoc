import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  public allData = new Subject<any>();

  public gridTileData = [];

  nodeJSEndpoint = 'http://vm3.infosol.com:8012/';

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSEndpoint);
  }

  public getGridTileData(box: string) {
    const index = this.gridTileData.findIndex(x => x.key === box);
    // return this.gridTileData[index]['data'];
  }

  passData(data): any {
    this.gridTileData = data;
  }

  constructor(private http: HttpClient) { }

}
