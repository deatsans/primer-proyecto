import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTES LOCALES
import { NavbarComponent } from './componets/navbar/navbar.component';
import { FooterComponent } from './componets/footer/footer.component';

// COMPONENTES IMPORTADOS DE MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

// RUTAS GENERALES DE TODOS LOS MÓDULOS
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class SharedModule { }