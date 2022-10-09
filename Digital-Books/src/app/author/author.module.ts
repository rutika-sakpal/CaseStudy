import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { authorroutes } from '../routing/authorroutes';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInterceptorService } from '../services/tokenInceptorService';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { AuthorComponent } from './author.component';

@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authorroutes),
    GridUIModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginServiceService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AuthorComponent]
})
export class AuthorModule { }
