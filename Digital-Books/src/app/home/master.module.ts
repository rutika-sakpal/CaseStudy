import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MasterComponent } from '../master/master.component';
import { RouterModule } from '@angular/router';
import { Mainroutes } from '../routing/mainroutes';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { RegistrationComponent } from '../registration/registration.component';
import { AuthguardService } from '../services/authguard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { PurchasebookComponent } from '../purchasebook/purchasebook.component';
import { MyorderComponent } from '../myorder/myorder.component';


@NgModule({
  declarations: [
    
   MasterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    PurchasebookComponent,
    MyorderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(Mainroutes),
    HttpClientModule
  ],
  providers: [AuthguardService,LoginServiceService ,{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
