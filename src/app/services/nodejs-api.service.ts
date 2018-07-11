import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  public allData = new Subject<any>();
  public gridTileData = new Subject<any>();

  nodeJSEndpoint = 'http://localhost:8012/data';

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSEndpoint);
  }

  constructor(private http: HttpClient) { }

}
