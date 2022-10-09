import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/userdata';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service: LoginServiceService, private _router: Router) { }
  ErrorMessage: any = '';
  UserDataModel: UserData = new UserData();
  ngOnInit(): void {
  }
  loginUser() {
    this._service.loginUser(this.UserDataModel).subscribe(res => {
      debugger;
      // console.log('Hi You are able to login');
      // alert('Hi');     
      localStorage.setItem('token', res.token);
      if(res.role=="Author")
      {
        this._router.navigate(["author/home"]);
      }
      if(res.role=="Reader")
      {
        this._router.navigate(["reader/add"]);
      }     
    }, res => console.log(res));
  }

}
