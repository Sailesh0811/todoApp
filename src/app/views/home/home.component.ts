import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {SearchService} from '../../services/search.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: any = [];
  todoStorage: any = [];
  title: string;
  todo: string;
  date: string;
  createForm: FormGroup;
  formBuilder: FormBuilder;
  searchText: string;
  searchFilter: string;
  constructor(public http: HttpServiceService, search: SearchService) {
    this.title = '';
    this.todo = '';
    this.date = '';
    this.createForm = this.createTodoForm();
    search.getSearchValue().subscribe(searchValue => {
      this.searchText = searchValue.val;
      this.searchFilter = searchValue.filter;
      console.log(searchValue);
      this.search();
    });
  }

  ngOnInit() {
    this.getTodos();
  }
  getTodos() {
    this.http.get('https://todoappcodatest.herokuapp.com/todos').subscribe(res => {
      this.todos = res;
      this.todoStorage = res;
      console.log(this.todos);
    });
  }
  createTodo() {
    // if (this.createForm.invalid) {
    //   return;
    // }
    console.log(this.createForm.controls['date'].value);
    this.http.post('https://todoappcodatest.herokuapp.com/create', { title: this.createForm.controls['title'].value,
       todo: this.createForm.controls['todo'].value,
       due: this.createForm.controls['date'].value, status: '0'})
    .subscribe(res => {
      $('#createModal').modal('toggle');
    this.getTodos();
    });
    this.resetCreateTodoForm();
  }
  createTodoForm() {
    return new FormGroup({
        todo: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
    });
  }
  resetCreateTodoForm() {
    this.createForm.reset();
  }
  updateTodo(status, id) {
    this.http.post('https://todoappcodatest.herokuapp.com/update', {id: id, status: status })
    .subscribe(res => {
      this.getTodos();
    });
  }
  search() {
    this.todos = this.todoStorage;
    if (this.searchFilter === '2') {
      this.todos = this.todos.filter (item => {
        if (item.title.toLowerCase().includes(this.searchText.toLowerCase())) {
          return item;
        }
      });
      return;
    }
    this.todos = this.todos.filter(item => {
      if (item.status === this.searchFilter) {
        if (item.title.toLowerCase().includes(this.searchText.toLowerCase())) {
          return item;
        }
      }
    });
  }
}
