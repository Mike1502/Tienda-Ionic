import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController, Modal, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../usuario/usuario';
import { LoginPage, CarritoPage } from '../../pages/index.paginas';
import { URL_SERVICIOS } from '../../config/config.servcios';
import { Orden, Ordenes } from '../../interfaces/orde.interface';
import { Rpedido, Bpedido } from '../../interfaces/posts.interface';


@Injectable()
export class CarritoProvider {

  items: any[] = [];
  total_carrito: number;
  ordenes: Array<Orden>;

  constructor(public http: HttpClient,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public storage: Storage,
    public us: UsuarioProvider,
    public modalCtrl: ModalController) {
    console.log('Hello CarritoProvider Provider');
    this.cagar_storage();
    this.actualizar_total();
  }

  actualizar_total() {
    this.total_carrito = 0;
    for (let item of this.items) {
      this.total_carrito += Number(item.precio_compra)
    }
  }

  realizar_pedido() {
    let data = new FormData();
    let codigos: string[] = [];

    for (let item of this.items) {
      codigos.push(item.codigo);
    }

    data.append('items', codigos.join(','));

    let url = `${URL_SERVICIOS}/pedidos/realizar_orden/${this.us.token}/${this.us.id_usuario}`;

    this.http.post(url, data).subscribe((resp: Rpedido) => {
      if (resp.error) {

      } else {
        this.items = [];
        this.alertCtrl.create({
          title: 'Orden Realizada',
          message: 'Su orden fue realizada de manera exitosa',
          buttons: ['OK']
        }).present();
      }
    });
  }

  remover_item(idx: number) {
    this.items.splice(idx, 1);
    this.actualizar_total();
  }

  ver_carrito() {
    console.log("entrando a ver Carrito");

    let modal: any;

    if (this.us.token) {
      modal = this.modalCtrl.create(CarritoPage);
    } else {
      modal = this.modalCtrl.create(LoginPage);
    }

    modal.present();

    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    });


  }

  agregar_carrito(item_parametro: any) {

    for (const item of this.items) {
      if (item.codigo == item_parametro.codigo) {
        this.alertCtrl.create({
          title: "Item Existe",
          subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compra",
          buttons: ["OK"]
        }).present();
        return;
      }
    }
    this.items.push(item_parametro);
    this.guardar_storage();
    this.actualizar_total();
    const toast = this.toastCtrl.create({
      message: item_parametro.producto + ' Agregado al carrito de compra',
      duration: 3000
    }).present();
  }

  guardar_storage() {

    if (this.platform.is('cordova')) {
      this.storage.set('items', this.items)
    } else {
      localStorage.setItem('items', JSON.stringify(this.items));
    }

  }

  cagar_storage() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {
        this.storage.ready().then(() => {
          this.storage.get('items').then(items => {
            if (items) {
              this.items = items;
            }
            resolve();
          });
        });
      } else {
        if (localStorage.getItem('items')) {
          this.items = JSON.parse(localStorage.getItem('items'));
        }
        resolve();
      }

    });
    return promesa;

  }

  cargar_ordenes() {
    let url = `${URL_SERVICIOS}/pedidos/obtener_pedidos/${this.us.token}/${this.us.id_usuario}`
    this.http.get(url).subscribe((data: Ordenes) => {
      if (data.error) {

      } else {

        console.log(data.ordenes)
        this.ordenes = data.ordenes;
      }
    });
  }

  borrar_orden(orden_id: string) {
    let url = `${URL_SERVICIOS}/pedidos/borrar_pedido/${this.us.token}/${this.us.id_usuario}/${orden_id}`;
    return this.http.delete(url).map((resp: Bpedido) => resp);
  }
}
