import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  status: string;
  statusMatch = ['Not Completed', 'Completed', 'All'];
  searchValue: string;
  searchFilter: string;
  constructor(public searchService: SearchService) {
    this.searchFilter = this.statusMatch[2];
    this.searchValue = '';
   }

  ngOnInit() {
  }
  changeStatus(value) {
    this.searchFilter = this.statusMatch[value];
    this.changeSearch();
  }
  changeSearch() {
    this.searchService.searchValueUpdate(this.searchValue, this.statusMatch.indexOf(this.searchFilter) + '');
  }
}
