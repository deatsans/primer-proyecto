import { Producto } from "./producto"

//
export interface Pedido {
    idpedido: string
    producto: Producto
    cantiadad: number
    total: number
}
