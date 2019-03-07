import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoPage } from '../producto/producto';

@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ps: ProductosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  buscar_productos(ev: any) {
    let valor = ev.target.value;
    console.log(valor)
    this.ps.buscar_producto(valor);
  }

}
