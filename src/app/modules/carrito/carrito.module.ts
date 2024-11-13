import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { PedidoComponent } from './components/pedido/pedido.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidoComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    CarritoRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CarritoModule { }
