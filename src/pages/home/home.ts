import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import {ProductoPage} from '../producto/producto'
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage;

  constructor(
    public navCtrl: NavController,
    public _ps: ProductosProvider, 
    public cs: CarritoProvider,
    public us:UsuarioProvider
  ) { }

  siguiente_pagina(infiniteScroll) {
    this._ps.cargarTodos().then(() => {
      infiniteScroll.complete();
    });
  }
}
