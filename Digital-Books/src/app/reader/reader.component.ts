import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Author } from '../author/author.model';
import { SearchData } from '../models/searchdata';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private http: HttpClient,private _router: Router,private jwt: JwtHelperService, private _auth: LoginServiceService) { }
  display = "none";
  titl:string='';
  autho:string='';
  publishe:string='';
  public url:string="https://localhost:44307/api/Reader/SearchAllBooks";

  ngOnInit(): void {

    this.name=this.jwt.decodeToken(this._auth.getToken()?.toString()).unique_name;
    console.log(this.jwt.decodeToken(this._auth.getToken()?.toString()));
    console.log(this.name);
    this.routeId =this.jwt.decodeToken(this._auth.getToken()?.toString()).nameid
    
  }
  public name ='';
  public routeId='';
  SearchBookModels: Array<Author> = new Array<Author>();
  SearchBookModel:SearchData=new SearchData();
  ModelData :Array<Author> = new Array<Author>();

 
  openNewModal(input:any) {
    debugger;
    this.GetAuthorBookDetailById1(input);
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";   
  } 
  GetAuthorBookDetailById1(input:any) {
    debugger;
    this.http.get("https://localhost:44307/api/Reader/GetAuthorBookByAuthorBookID?authorBookId="+input).subscribe(res => this.PostSuccess(res), res => console.log(res)); 
    //this.http.get("https://localhost:44363/api/gateway/digitalBook/GetAuthorBookByAuthorBookID?authorBookId="+input).subscribe(res => this.PostSuccess(res), res => console.log(res)); 
  
  }
  GetAuthorBookDetailById(input:any) {
    debugger;
    //this.http.get("https://localhost:44363/api/gateway/digitalBook/GetAuthorBookByAuthorBookID?authorBookId="+input).subscribe(res => this.PostSuccess(res), res => console.log(res)); 
  
    this.http.get("https://localhost:44307/api/Reader/GetAuthorBookByAuthorBookID?authorBookId="+input).subscribe(res => this.PostSuccess(res), res => console.log(res)); 
    this._router.navigate(["reader/add/purchasebook",input]);
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
  PostSuccess(input: any) {
    debugger;
    console.log(input);
    this.ModelData = input;
  }
}
