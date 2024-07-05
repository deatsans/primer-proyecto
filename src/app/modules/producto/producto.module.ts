import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { ProductoComponent } from './pages/producto/producto.component';
import { DlcComponent} from './pages/dlc/dlc.component';
import { MercamsiaComponent } from './pages/mercamsia/mercamsia.component';
import {  MicropagoComponent } from './pages/micropago/micropago.component';

@NgModule({
  declarations: [
    ProductoComponent,
    MercamsiaComponent,
    DlcComponent,
    MicropagoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    ProductoComponent,
    MercamsiaComponent,
    DlcComponent,
    MicropagoComponent
  ]
})
export class ProductoModule { }