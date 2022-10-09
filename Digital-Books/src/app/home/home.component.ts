import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../author/author.model';
import { SearchData } from '../models/searchdata';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display = "none";
  titl:string='';
  autho:string='';
  publishe:string='';

  public url:string="https://localhost:44307/api/Reader/SearchAllBooks";

  constructor(private http: HttpClient,private _auth:LoginServiceService,private _router: Router) { }
 
  ngOnInit(): void {
    
  }
  SearchBookModels: Array<Author> = new Array<Author>();
  SearchBookModel:SearchData=new SearchData();
  ModelData :Array<Author> = new Array<Author>();
  openModal(input:any) {
    debugger;
    this.GetAuthorBookDetailById(input);
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  GetAllAuthorBook()
  {
    debugger;
    this.titl=this.SearchBookModel.title;
    this.autho=this.SearchBookModel.author;
    this.publishe=this.SearchBookModel.publisher;

    this.http.post(this.url+'?title='+this.titl +'& publisher='+this.publishe,"").subscribe(res => this.Success(res),res => console.log(res));
  }
  Success(input: any) {
    console.log(input);
    this.SearchBookModels = input;
  }
  GetAuthorBookDetailById(input:any) {
    debugger;
    this.http.get("https://localhost:44363/api/gateway/digitalBook/GetAuthorBookByAuthorBookID?authorBookId="+input).subscribe(res => this.PostSuccess(res), res => console.log(res));
  }
  PostSuccess(input: any) {
    debugger;
    console.log(input);
    this.ModelData = input;
  }
  ReaderLoggedIn(){
    debugger;
      alert("Login Needed");
      this._router.navigate(["login"]);
      return;

    }
  
}
