import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  // public variables
  public allData = new Subject<any>();
  public gridTileData = new Subject<any>();
  public primaryDonutChartData = new Subject<any>();
  public dormantDonutChartData = new Subject<any>();

  // local variables
  private nodeJSAllDataEndpoint = '/data';
  private nodeJSPrimaryDonutChartData = '/primary-population:';
  private nodeJSDormantDonutChartData = '/dormant-population:';
  private vm3NodeJSEndpoint = environment.nodeJs.vm3;
  private localNodeJSEndpoint = environment.nodeJs.local;
  public orgFilter = "Accenture";


  getAllFiles(): Observable<any> {
    return this.http.get(this.vm3NodeJSEndpoint + this.nodeJSAllDataEndpoint);
  }
  getPrimaryDonutChartData(org: any): Observable<any> {
    console.log(this.orgFilter);
    return this.http.get(this.vm3NodeJSEndpoint + this.nodeJSPrimaryDonutChartData + org);
  }
  getDormantDonutChartData(org: any): Observable<any> {
    console.log(org);
    console.log(this.orgFilter);

    return this.http.get(this.vm3NodeJSEndpoint + this.nodeJSDormantDonutChartData + org);
  }
  constructor(private http: HttpClient) { }

}
