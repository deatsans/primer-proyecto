import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// IMPORTACIONES DE LAS VISTAS DEL MÓDULO PRODUCTO
import { ProductoComponent } from './pages/producto/producto.component';
import { DlcComponent } from './pages/dlc/dlc.component';
import { MercamsiaComponent } from './pages/mercamsia/mercamsia.component';
import { MicropagoComponent } from './pages/micropago/micropago.component';

const routes: Routes = [
  {
    path:"producto",component:ProductoComponent
  },
  {
    path:"mercasia",component:MercamsiaComponent
  },
  {
    path:"dlc",component:DlcComponent
  },
  {
    path:"micropago",component:MicropagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }