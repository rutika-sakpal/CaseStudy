import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  _loginUrl="https://localhost:44363/api/gateway/digitalBook/login";
  //_loginUrl="http://4.227.184.79/api/gateway/digitalBook/login";
  _registerUrl="https://localhost:44363/api/gateway/digitalBook/register";
  //_registerUrl="http://4.227.184.79/api/gateway/digitalBook/register";

  constructor(private http:HttpClient, private _router:Router,private jwt: JwtHelperService) { }
  public role ='';
  public routeId='';
  //Login author and reader
  loginUser(login:any){
    return this.http.post<any>(this._loginUrl,login);
  }
  registerUser(login:any){
    return this.http.post<any>(this._registerUrl,login);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserRole(){
    this.role=this.jwt.decodeToken(this.getToken()?.toString()).role;  
    return this.role;
  }
  getUserId(){
    this.routeId =this.jwt.decodeToken(this.getToken()?.toString()).nameid  
    return this.routeId;
  }
  logginIn(){
    return !!localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['']);
  }
}
