
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Mainroutes } from '../routing/mainroutes';
import { purchasebookroutes } from '../routing/purchasebookroutes';
import { MyorderComponent } from './myorder.component';



@NgModule({
  declarations: [
    MyorderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(Mainroutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [MyorderComponent]
})
export class MyorderModule { }
