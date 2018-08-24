import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new Subject<Search>();
  constructor() { }

  getSearchValue() {
    return this.subject.asObservable();
  }
  searchValueUpdate(val, filter) {
  this.subject.next(<Search>
  { 'val': val, 'filter': filter });
  }
}

class Search {
'val': string;
'filter': string;
}
