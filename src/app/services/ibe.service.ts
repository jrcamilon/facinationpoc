import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

class Parameter {
  prompt: String;
  value: String;
}


@Injectable()
export class IbeService {

  public genders = new Subject<any>();

  // To be remove when published to prod - uses this as a token when making calls
  private prod_connection: Object =  {
    'user': 'JR',
    'pass': 'Sqlrules!',
  };

  constructor(private http: HttpClient) {
    console.log('Running Ibe Service');
  }

  public cacheQuery (query: String, xdc: String, parameters: Parameter[]): Observable<any> {
    let params = '';
      params = parameters.reduce((prev, param) => {
        let p = '';
        p = prev + '&' + param.prompt + '=' + param.value;
        return p;
      }, '');

    const connection = this.prod_connection;
    const token = 'Basic ' + btoa(connection['user'] + ':' + connection['pass']);
    const headers = new HttpHeaders() .set('Authorization', token)
                                      .set('Accept', '*/*');

    // http://vm1.infosol.com:8551/infoburst/rest/exec/xdcqry/439?q=Genders&json=1
    console.log(environment.infosolApi + '/infoburst/rest/exec/xdcqry/' + xdc + '?q=' +
    query + params + '&json=1', {headers: headers, responseType: 'text' as 'json'});

    return this.http.get(environment.infosolApi + '/infoburst/rest/exec/xdcqry/' + xdc + '?q=' +
                         query + params + '&json=1', {headers: headers, responseType: 'text' as 'json'});
  }
}
