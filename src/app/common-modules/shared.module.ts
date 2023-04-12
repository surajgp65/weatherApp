import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';


// array for import export all modules..
const moduleList=[
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
]

@NgModule({
  declarations: [
  
  ],
  imports: [moduleList],
  exports:[moduleList]
})
export class SharedModule { }
