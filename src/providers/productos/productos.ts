import { URL_SERVICIOS } from '../../config/config.servcios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Producto, ProducotDato } from '../../interfaces/prodcuto.interface';
import { Linea, Lineas } from '../../interfaces/lineas.interface';


@Injectable()
export class ProductosProvider {

  pagina: number = 0;
  productos: any[] = [];
  lineas: Array<Linea>;
  por_categotias: Array<ProducotDato>;
  resultados: Array<ProducotDato>;

  constructor(public http: HttpClient) {
    this.cargarTodos();
    this.cargar_lineas();
  }

  cargar_por_categorias(categoria: number) {

    let url = URL_SERVICIOS + '/productos/por_tipo/' + categoria;
    this.http.get(url).subscribe((data: Producto) => {
      if (data.error) {

      } else {
        this.por_categotias = data.productos;
        console.log(this.por_categotias);
      }
    });
  }

  cargar_lineas() {

    let url = URL_SERVICIOS + '/lineas';
   
    this.http.get(url).subscribe((data: Lineas) => {
      console.log(data);
      if (data.error) {

      } else {
        this.lineas = data.lineas;
        console.log('Estas son las lineas',this.lineas);
      }

    });

  }

  cargarTodos() {

    let promesa = new Promise((resolve, reject) => {

      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

      this.http.get(url)
        .subscribe((data: Producto) => {
          console.log(data);

          if (data.error) {

          } else {
            let nuevaData: Array<ProducotDato>;
            nuevaData = this.agrupar(data.productos, 2);
            this.productos.push(...nuevaData);
            this.pagina = this.pagina + 1;
          }

          resolve();

        });

    });

    return promesa;

  }

  private agrupar(arr: Array<ProducotDato>, tamano: number) {

    let nuevoArreglo = [];

    for (let i = 0; i < arr.length; i += tamano) {
      nuevoArreglo.push(arr.slice(i, i + tamano));
    }
    console.log(nuevoArreglo);
    return nuevoArreglo;
  }

  buscar_producto(termino: string) {
    let url = URL_SERVICIOS + '/productos/buscar/' + termino;
    this.http.get(url).subscribe((resp: Producto) => {
      let data = resp;
      this.resultados = data.productos;
    })
  }
}