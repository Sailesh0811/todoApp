import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public http: HttpClient) { }
  public get(url) {
    return this.http.get(url);
  }
  public post(url: string, body: any): Observable<any> {
     return this.http.post(url, body);
  }
}
