import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../serices/crud.service';
import { FormControl,FormGroup,Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionProducto: Producto[]=[]

  producto = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Precio: new FormControl(0, Validators.required),
    Descripcion: new FormControl('', Validators.required),
    Categoria: new FormControl('', Validators.required),
    Imagen: new FormControl('', Validators.required),
    Alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService){}
}
