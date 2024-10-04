import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';




@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private productosCollection:AngularFirestoreCollection<Producto>

  private respuesta! : UploadResult


  private storage = getStorage()

  constructor(private database: AngularFirestore) { 
    this.productosCollection = database.collection('producto')
  }

  crearProducto(producto: Producto, url: string){
    return new Promise(async(resolve, reject)=> {
      try{
        const idProducto = this.database.createId()

        //asignamos id creando
        producto.idProducto = idProducto
        producto.imagen = url
        const resultado = await this.productosCollection.doc(idProducto).set(producto)

        resolve(resultado)
      }catch(error){
        reject(error)
      }
    })
  }

  obtenerProducto(){
    return this.productosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }


  modificarProducto(idProducto: string, nuevaData: Producto){
    return this.database.collection('producto').doc(idProducto).update(nuevaData)
  }



  eliminarProducto(idProducto: string, imagenURL: string){
    return new Promise((resolve, reject) =>{
      try{
        const storage = getStorage()

        const referenciaImagen = ref(storage, imagenURL)
        deleteObject(referenciaImagen)
        .then((res)=>{
          const respuesta = this.productosCollection.doc(idProducto).delete()
          resolve(respuesta)
        })
        .catch(error =>{
          reject("error al eliminar imagen: \n"+Error)
        })
        }
       
      catch(error){
        reject(error) 
      }
    })
    
  }

  obtenerUrlImagen(respuesta: UploadResult){
    return getDownloadURL (respuesta.ref)
  }

  /**
   * parametros definidos
   * @param {string} nombre
   * @param {any} imagen
   * @param {string} ruta
   * @returns
   */

  async subirImagen(nombre: string, imagen: any, ruta: string){
    try{
      let referenciaImagen= ref(this.storage, ruta + '/'+ nombre)

      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
      .then(resp=>{
        return resp
      })

      return this.respuesta
    }
    catch(error){
      console.log("error: \n"+error)

      return this.respuesta
    }
  }
}
