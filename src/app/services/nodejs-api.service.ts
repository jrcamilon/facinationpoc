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

  nodeJSEndpoint = environment.nodeJs.vm3;

  getAllFiles(): Observable<any> {
    return this.http.get(this.nodeJSEndpoint);
  }

  constructor(private http: HttpClient) { }

}
