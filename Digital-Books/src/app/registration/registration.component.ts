import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleData } from '../models/roledata';
import { UserData } from '../models/userdata';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  roles : RoleData[] = [
    {roleId : 1, roleName : "Author"},
    {roleId : 2, roleName : "Reader"}
  ];

  constructor(private _service :LoginServiceService,private _router:Router) {
    this.getAllRoles();
   }

  getAllRoles() : RoleData[]{
    return this.roles;
  }
  ErrorMessage:any='';
  UserDataModel:UserData=new UserData();
  ngOnInit(): void {
  }
  registerUser(){
    debugger;
    this._service.registerUser(this.UserDataModel).subscribe(res=>{
      // console.log('Hi You are able to login');
      // alert('Hi');
      
      localStorage.setItem('token',res.token);
     this._router.navigate(["author/home"]);
    },res=>console.log(res));
  }
}
