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
 
  public primaryDonutChartData = new Subject<any>();
  public dormantDonutChartData = new Subject<any>();

  nodeJSAllDataEndpoint = '/data';
  nodeJSPrimaryDonutChartData = '/primary-population:';
  nodeJSDormantDonutChartData = '/dormant-population:';

  vm3NodeJSEndpoint = environment.nodeJs.vm3;
  localNodeJSEndpoint = environment.nodeJs.local;


  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSAllDataEndpoint);
  }
  getPrimaryDonutChartData(org: any): Observable<any> {
    console.log(org);
    return this.http.get(this.vm3NodeJSEndpoint + this.nodeJSPrimaryDonutChartData+org);
  }
  getDormantDonutChartData(org: any): Observable<any> {
    console.log(org);
    return this.http.get(this.vm3NodeJSEndpoint + this.nodeJSDormantDonutChartData+org);
  }
  constructor(private http: HttpClient) { }

}
