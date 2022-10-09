import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { registrationroutes } from '../routing/registrationroutes';
import { RegistrationComponent } from './registration.component';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(registrationroutes)
  ],
  providers: [],
  bootstrap: [RegistrationComponent]
})
export class RegistrationModule { }
