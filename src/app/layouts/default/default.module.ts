import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';


@NgModule({
  declarations: [ 
    DefaultComponent,
    LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}]

})
export class DefaultModule { }
