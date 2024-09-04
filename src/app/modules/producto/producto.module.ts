import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ARCHIVO DE RUTAS
import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS
import { ProductoComponent } from './pages/producto/producto.component';
import { DlcComponent} from './pages/dlc/dlc.component';
import { MercamsiaComponent } from './pages/mercamsia/mercamsia.component';
import {  MicropagoComponent } from './pages/micropago/micropago.component';
import { CardDlcComponent } from './components/card-dlc/card-dlc.component';
import { CardComponent } from './components/card-dlc/card/card.component';

@NgModule({
  declarations: [
    ProductoComponent,
    MercamsiaComponent,
    DlcComponent,
    MicropagoComponent,
    CardDlcComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    ProductoComponent,
    MercamsiaComponent,
    DlcComponent,
    MicropagoComponent,
    CardComponent
  ]
})
export class ProductoModule { }