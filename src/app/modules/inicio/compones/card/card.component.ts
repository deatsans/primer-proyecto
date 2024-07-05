import { Component } from '@angular/core';
// IMPORTAMOS INTERFAZ
import { Animals } from 'src/app/models/animals';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // PROPIEDAD PÚBLICA (TIPO ARRAY)
  public info: Animals[];

  constructor(){
    this.info = [
      {
        id: "",
        nombre: "the witcher 3",
        anual:2015 ,
        imagen: "https://i.pinimg.com/564x/92/d4/99/92d499d9fc82f775051cd68f34a07f3f.jpg",
        alt: "the witcher 3"
      },
      {
        id: "",
        nombre: "Baldur's Gate 3",
        anual: 2023,
        imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg?t=1713271288",
        alt: "juego del año"
      },
      {
        id: "",
        nombre: "Doom Eternal",
        anual: 2020,
        imagen: "https://www.esportmaniacos.com/wp-content/uploads/2021/02/doom-eternal-review-generacion-xbox-portada-780x470.jpg",
        alt: "Doom Eternal"
      },
      
    ]
  }
}
