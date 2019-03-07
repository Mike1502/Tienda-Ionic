import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public cs: CarritoProvider) {
    this.orden = this.navParams.get('orden');
    console.log(this.orden);
  }

  borrar_orden(orden_id) {
        this.cs.borrar_orden(orden_id).subscribe(data =>{
            if (data.error) {
              
            } else {
              this.navCtrl.pop()
              this.alertCtrl.create({
                  title: "Orden Eliminada",
                  buttons: ['OK']
              }).present();
            }
        });
  }

}
