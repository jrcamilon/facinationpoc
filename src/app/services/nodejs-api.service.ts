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
  public secondaryDonutChartData = new Subject<any>();
  public dormantDonutChartData = new Subject<any>();
  public orgnizationList = new Subject<any>();

  // local variables
  private nodeJSAllDataEndpoint = '/data';
  private nodeJSPrimaryDonutChartData = '/primary-population/:';
  private nodeJSSecondaryDonutChartData = '/secondary-population/:';
  private nodeJSDormantDonutChartData = '/dormant-population/:';
  private nodeJSConferenceOrganizations = '/organizations/:';
  private vm3NodeJSEndpoint = environment.nodeJs.vm3;
  private localNodeJSEndpoint = environment.nodeJs.local;

  static orgFilter = "gmail";
  static conFilter = "all"
  static totalMales = 136;
  static totalFemales= 353;

  static boxPrimaryData = [
    { key: 1, primary: "Innovation",languageOf: "Creativity", adjectives: "Creative, Entrepreneurial, Visionary", overview: "Push companies to innovate with creativity.", communication: "Tweak traditional conversation.", fascination:"Get creative.",otherLeaders:"Madonna, Albert Einstein, Amelia Earhart, Frank Lloyd Wright, Betty White" },
    { key: 2, primary: "Passion",languageOf: "Relationship", adjectives: "Engaging, Expressive, Intuitive", overview: "Build connections with warmth and enthusiam.", communication: "Immediately create an emotional connection.", fascination:"Connect with emotion.",otherLeaders:"Leonardo Da Vinci, Ronald Regan, Audrey Hepburn, Oprah Winfrey, George Lucas" },
    { key: 3, primary: "Power",languageOf: "Confidence", adjectives: "Confident, Goal-Oriented, Decisive", overview: "Communicate with authority and confidence.", communication: "Speak with authority and control.", fascination:"Lead with authority.",otherLeaders:"Arianna Huffington, Tim Tebow,  Michael Bloomberg, Warren Buffett, Mark Zuckerberg" },
    { key: 4, primary: "Prestige",languageOf: "Excellence", adjectives: "Respected,  Ambitious, Results-Oriented", overview: "Earn respect by setting high standards.", communication: "Seek results and respect. ", fascination:"Set the standard.",otherLeaders:"Heidi Klum, Enzo Ferrari,  Princess Diana, James Bond, Gordon Ramsay" },
    { key: 5, primary: "Trust",languageOf: "Stability", adjectives: "Stable, Dependable, Familiar", overview: "Earn loyalty as a constent and familiar presence.", communication: "Bring even-keeled consistency.", fascination:"Build loyalty.",otherLeaders:"Walt Disney, Sam Walton, Dr. Oz, Clint Eastwood, Mother Theresa" },
    { key: 6,  primary: "Mystique",languageOf: "Listening", adjectives: "Observant, Independent, Logical", overview: "Impress with analytical skills and thoughtful communication.", communication: "Listen carefully and observe.", fascination:"Listen with care. ",otherLeaders:"Tina Fey, Johnny Depp, Malcolm Gladwell, Stephen Hawking, Michael Crichton" },
    { key: 7, primary: "Alert",languageOf: "Details", adjectives: "Detailed, Organized, Proactive", overview: "Keep people and projects on track by managing the details.", communication: "Focus on the task at hand.", fascination:"Protect the details.",otherLeaders:"Ralph Nader, Mary Poppins, Chuck Norris, James Cameron, Upton Sinclair" }

  ];

  static archetypeData = [
    { boxkey: 11,adjectives:"Volatile,  Startling, Chaotic" },
    { boxkey: 12,adjectives:"Bold, Artistic, Unorthodox" },
    { boxkey: 13,adjectives:"Pioneering, Irreverent, Entrepreneurial" },
    { boxkey: 14,adjectives:"Cutting-Edge,  Elite, Imaginative" },
    { boxkey: 15,adjectives:"Deliberate, Thoughtful ,Flexible" },
    { boxkey: 16,adjectives:"Clever, Adept, Contemporary" },
    { boxkey: 17,adjectives:"Prolific, Thorough, Diligent" },
    { boxkey: 21,adjectives:"Out-of-the-Box, Social, Energizing" },
    { boxkey: 22,adjectives:"Theatrical, Emotive, Sensitive" },
    { boxkey: 23,adjectives:"Dynamic, Inclusive, Engaging" },
    { boxkey: 24,adjectives:"Expressive, Stylish, Emotionally-Intelligent" },
    { boxkey: 25,adjectives:"Nurturing Loyal, Sincere" },
    { boxkey: 26,adjectives:"Discerning, Perceptive, Considerate" },
    { boxkey: 27,adjectives:"Attentive Dedicated, Efficient" },
    { boxkey: 31,adjectives:"Inventive, Untradtional, Self-Propelled" },
    { boxkey: 32,adjectives:"Motivating, Spirited, Compelling" },
    { boxkey: 33,adjectives:"Dominant, Overbearing, Dogmatic" },
    { boxkey: 34,adjectives:"Ambitious, Focused, Confident" },
    { boxkey: 35,adjectives:"Prominent, Genuine, Sure-Footed" },
    { boxkey: 36,adjectives:"Methodical, Intense, Self-Reliant" },
    { boxkey: 37,adjectives:"Proactive, Cautionary, String-Willed" },
    { boxkey: 41,adjectives:"Original, Enterprising, Forward-Thinking" },
    { boxkey: 42,adjectives:"Insightful, Distinguished, In-the-Know" },
    { boxkey: 43,adjectives:"Respectedl, Competitive, Results-Oriented" },
    { boxkey: 44,adjectives:"Arrogant, Cold, Superior" },
    { boxkey: 45,adjectives:"Classic, Established, Best-in-Class" },
    { boxkey: 46,adjectives:"Restrained" },
    { boxkey: 47,adjectives:"Intellectual, Disciplined, Systematic" },
    { boxkey: 51,adjectives:"Curious, Adaptable, Open-Mainded" },
    { boxkey: 52,adjectives:"Approachable, Dependable, Trustworthy" },
    { boxkey: 53,adjectives:"Dignified" },
    { boxkey: 54,adjectives:"Levelheaded, Subtle, Capable" },
    { boxkey: 55,adjectives:"Predictable, Safe, Unmovable" },
    { boxkey: 56,adjectives:"Protective, Purposeful, Analytical" },
    { boxkey: 57,adjectives:"Principled, Prepared, Conscientous" },
    { boxkey: 61,adjectives:"Nimble, Unassuming, Independent" },
    { boxkey: 62,adjectives:"Tactful, Self-Sufficient, Mindful" },
    { boxkey: 63,adjectives:"Realistic, Intentional, To-the-Point" },
    { boxkey: 64,adjectives:"Elegant,Astute,Discreet" },
    { boxkey: 65,adjectives:"Observant, Assured, Unruffed" },
    { boxkey: 66,adjectives:"Unemotional, Introverted, Concentrated" },
    { boxkey: 67,adjectives:"On-Target Reasoned, Pragmatic" },
    { boxkey: 71,adjectives:"Strategic,Fine-Tuned,Judicious" },
    { boxkey: 72,adjectives:"Constructive,Organized,Practical" },
    { boxkey: 73,adjectives:"Decisive,Tireless,Forthright" },
    { boxkey: 74,adjectives:"Productive,Skilled,Detailed" },
    { boxkey: 75,adjectives:"Steadfast,Composed,Structured" },
    { boxkey: 76,adjectives:"Clear-Cut,Accurate,Meticulous" },
    { boxkey: 77,adjectives:"Compulsive,Driven,Exacting" }    
  ]

  getAllFiles(): Observable<any> {
    return this.http.get(this.localNodeJSEndpoint + this.nodeJSAllDataEndpoint+'/:'+ `${NodejsApiService.conFilter}`);
  }

  getPrimaryDonutChartData(): Observable<any> {
    console.log(this.localNodeJSEndpoint + this.nodeJSPrimaryDonutChartData + NodejsApiService.orgFilter+'/:'+`${NodejsApiService.conFilter}`);

    return this.http.get(this.localNodeJSEndpoint + this.nodeJSPrimaryDonutChartData + NodejsApiService.orgFilter+'/:'+`${NodejsApiService.conFilter}`);
  }

  getSecondaryDonutChartData(): Observable<any> {
    console.log(this.localNodeJSEndpoint + this.nodeJSSecondaryDonutChartData + NodejsApiService.orgFilter+'/:'+`${NodejsApiService.conFilter}`);
    return this.http.get(this.localNodeJSEndpoint + this.nodeJSSecondaryDonutChartData + NodejsApiService.orgFilter+'/:'+`${NodejsApiService.conFilter}`);
  }

  getDormantDonutChartData(): Observable<any> {
    return this.http.get(this.localNodeJSEndpoint + this.nodeJSDormantDonutChartData + NodejsApiService.orgFilter+'/:'+NodejsApiService.conFilter);
  }

  getConferenceOrganizations(): Observable<any>{
    console.log(this.localNodeJSEndpoint + this.nodeJSConferenceOrganizations + NodejsApiService.conFilter)
    return this.http.get(this.localNodeJSEndpoint + this.nodeJSConferenceOrganizations + NodejsApiService.conFilter);

  }
  constructor(private http: HttpClient) { }

}
