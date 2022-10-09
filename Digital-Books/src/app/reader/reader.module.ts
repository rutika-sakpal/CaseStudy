import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { readerroutes } from '../routing/readerroutes';
import { ReaderComponent } from './reader.component';

@NgModule({
  declarations: [
    ReaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(readerroutes)
  ],
  providers: [],
  bootstrap: [ReaderComponent]
})
export class ReaderModule { }
