import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  public allData = new Subject<any>();
  public gridTileData = new Subject<any>();
  public primaryCountData = new Subject<any>();
  public secondaryCountData = new Subject<any>();
  nodeJSAllDataEndpoint = 'http://localhost:8012/data';
  nodeJSRangeBarDataEndpoint = 'http://localhost:8012/rangebar-data';
  nodeJsPrimaryCountData = 'http://localhost:8012/primary-counts';
  nodeJsSecondaryCountData = 'http://localhost:8012/secondary-counts';

  nodeJSEndpoint = environment.nodeJs.vm3;

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSAllDataEndpoint);
  }
  getAllRangeBarData(): Observable<any> {
    return this.http.get(this.nodeJSRangeBarDataEndpoint); 
  }
  getAllPrimaryCountData(): Observable<any> {
    return this.http.get(this.nodeJsPrimaryCountData)
  }
  getAllSecondaryCountData(): Observable<any> {
    return this.http.get(this.nodeJsSecondaryCountData)
  }

  constructor(private http: HttpClient) { }

}
