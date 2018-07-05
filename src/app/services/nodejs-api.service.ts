import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NodejsApiService {

  nodeJSEndpoint = 'http://vm3.infosol.com:8012/';

  getAllFiles() {
    return this.http.get(this.nodeJSEndpoint);
  }

  constructor(private http: HttpClient) { }
}
