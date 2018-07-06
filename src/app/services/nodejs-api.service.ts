import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  public allData = new Subject<any>();

  nodeJSEndpoint = 'http://vm3.infosol.com:8012/';

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSEndpoint);
  }

  constructor(private http: HttpClient) { }
}
