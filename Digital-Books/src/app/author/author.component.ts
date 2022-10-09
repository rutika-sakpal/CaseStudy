import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginServiceService } from '../services/login-service.service';
import { Author } from './author.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  images:any;
  
  constructor(private http: HttpClient,private jwt: JwtHelperService, private _auth: LoginServiceService) {
    
}
 
  ngOnInit(): void {

    this.name=this.jwt.decodeToken(this._auth.getToken()?.toString()).unique_name;
    console.log(this.jwt.decodeToken(this._auth.getToken()?.toString()));
    console.log(this.name);
    this.routeId =this.jwt.decodeToken(this._auth.getToken()?.toString()).nameid
    debugger;
    //this.GetAllAuthorBook();
    this.GetAllAuthorBookByAuthorID(this.routeId)
  }

  AuthorBookModel: Author = new Author();
  AuthorBookModels: Array<Author> = new Array<Author>();
  showMsg=false;
  isEdit = false;
  public name ='';
  public routeId='';
  public authorBookId='';
  public selectedFile!:File;
  uploadFile(event:any)
  {
    debugger;
        this.selectedFile=event.target.files[0];
  }
  AddAuthorBook(event:any) {
      debugger;
      
      const formData=new FormData();
  
      formData.append('Image',this.selectedFile,this.selectedFile.name);
      formData.append('title',this.AuthorBookModel.title);
      formData.append('category',this.AuthorBookModel.category);
      formData.append('publisher',this.AuthorBookModel.publisher);
      formData.append('price',this.AuthorBookModel.price);
      formData.append('bookContent',this.AuthorBookModel.bookContent);
      formData.append('isActive',this.AuthorBookModel.isActive);
      // var customerdto = {
      //   title: this.AuthorBookModel.title,
      //   category: this.AuthorBookModel.category,
      //   publisher: this.AuthorBookModel.publisher,
      //   price: this.AuthorBookModel.price,
      //   bookContent: this.AuthorBookModel.bookContent,
      //   isActive:this.AuthorBookModel.isActive
      // };
      if (this.isEdit) {
        this.authorBookId= String(this.AuthorBookModel.authorBookId);
        formData.append('authorBookId',this.authorBookId);
        this.http.put("https://localhost:44307/api/Author/UpdateAuthorBook", formData).subscribe(res => this.PostSuccess(res), res => console.log(res))
      }
      else {
        this.http.post("https://localhost:44307/api/Author/SaveAuthorBook", formData).subscribe(res => this.PostSuccess(res), res => console.log(res))
      }
  
      this.AuthorBookModel = new Author();
      this.showMsg= true;
    }
    PostSuccess(input: any) {
      //this.GetAllAuthorBook();
      this.GetAllAuthorBookByAuthorID(this.routeId)
    }
    GetAllAuthorBookByAuthorID(input: any) {
      debugger;
      this.http.get("https://localhost:44307/api/Author/GetAllAuthorBookByAuthorID?authorId="+input).subscribe(res => this.Success(res), res => console.log(res));
    }
    GetAllAuthorBook()
    {
      this.http.get("https://localhost:44307/api/Author/GetAllAuthorBook").subscribe(res => this.Success(res), res => console.log(res));
  
    }
    Success(input: any) {
      console.log(input);
      this.AuthorBookModels = input;
    }
    EditBook(input: any)
    {
    
      this.isEdit = true;
      this.AuthorBookModel = input;
    }
    DeleteBook(input: any)
    {
     
      this.http.delete("https://localhost:44307/api/Author/DeleteAuthorBook?authorBookId=" + input.authorBookId).subscribe(res => this.PostSuccess(res), res => console.log(res));
    }
    hasError(typeofValidator:string,controlname:string):Boolean{
      return this.AuthorBookModel.formAuthorGroup.controls[controlname].hasError(typeofValidator);
    }
    BlockBook(input: any)
    {
      this.http.put("https://localhost:44307/api/Author/BlockAuthorBook" , input.authorBookId).subscribe(res => this.PostSuccess(res), res => console.log(res));
    }
  }

