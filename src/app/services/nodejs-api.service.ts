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

  static boxPrimaryData = [
    { primary: "Innovation",languageOf: "Creativity", adjectives: "Creative, Entrepreneurial, Visionary", overview: "Push companies to innovate with creativity.", communication: "Tweak traditional conversation.", fascination:"Get creative.",otherLeaders:"Madonna, Albert Einstein, Amelia Earhart, Frank Lloyd Wright, Betty White" },
    { primary: "Passion",languageOf: "Relationship", adjectives: "Engaging, Expressive, Intuitive", overview: "Build connections with warmth and enthusiam.", communication: "Immediately create an emotional connection.", fascination:"Connect with emotion.",otherLeaders:"Leonardo Da Vinci, Ronald Regan, Audrey Hepburn, Oprah Winfrey, George Lucas" },
    { primary: "Power",languageOf: "Confidence", adjectives: "Confident, Goal-Oriented, Decisive", overview: "Communicate with authority and confidence.", communication: "Speak with authority and control.", fascination:"Lead with authority.",otherLeaders:"Arianna Huffington, Tim Tebow,  Michael Bloomberg, Warren Buffett, Mark Zuckerberg" },
    { primary: "Prestige",languageOf: "Excellence", adjectives: "Respected,  Ambitious, Results-Oriented", overview: "Earn respect by setting high standards.", communication: "Seek results and respect. ", fascination:"Set the standard.",otherLeaders:"Heidi Klum, Enzo Ferrari,  Princess Diana, James Bond, Gordon Ramsay" },
    { primary: "Trust",languageOf: "Stability", adjectives: "Stable, Dependable, Familiar", overview: "Earn loyalty as a constent and familiar presence.", communication: "Bring even-keeled consistency.", fascination:"Build loyalty.",otherLeaders:"Walt Disney, Sam Walton, Dr. Oz, Clint Eastwood, Mother Theresa" },
    { primary: "Mystique",languageOf: "Listening", adjectives: "Observant, Independent, Logical", overview: "Impress with analytical skills and thoughtful communication.", communication: "Listen carefully and observe.", fascination:"Listen with care. ",otherLeaders:"Tina Fey, Johnny Depp, Malcolm Gladwell, Stephen Hawking, Michael Crichton" },
    { primary: "Alert",languageOf: "Details", adjectives: "Detailed, Organized, Proactive", overview: "Keep people and projects on track by managing the details.", communication: "Focus on the task at hand.", fascination:"Protect the details.",otherLeaders:"Ralph Nader, Mary Poppins, Chuck Norris, James Cameron, Upton Sinclair" },
  ]

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
