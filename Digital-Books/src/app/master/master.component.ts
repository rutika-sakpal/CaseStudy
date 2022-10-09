import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private _auth:LoginServiceService) { }
  public role='';
  public isCollapsed = true;
  ngOnInit(): void {
  }
  LoggedIn(Input:boolean):boolean{
    if(Input){
      return this._auth.logginIn() && this._auth.getUserRole()=="Author";
    }
    else{
      return !this._auth.logginIn();
    }
  }
  Logout(){
    this._auth.logoutUser();
    
  }
 
  LoggedInAsAuthor(Input:boolean):boolean{
    if(Input){
     return this._auth.logginIn() && this._auth.getUserRole()=="Author";
    }
    else{
      return !this._auth.logginIn();
    }
  }
  LoggedInAsReader(Input:boolean):boolean{
    if(Input){
     return this._auth.logginIn() && this._auth.getUserRole()=="Reader";
    }
    else{
      return !this._auth.logginIn();
    }
  }
}