
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { purchasebookroutes } from '../routing/purchasebookroutes';
import { PurchasebookComponent } from './purchasebook.component';


@NgModule({
  declarations: [
    PurchasebookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(purchasebookroutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [PurchasebookComponent]
})
export class PurchasebookModule { }
