import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TableComponent } from './components/table/table.component';
import { AdminComponent } from './page/admin/admin.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AdminComponent,
    TableComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
