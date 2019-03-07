import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config.servcios';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Login } from '../../interfaces/posts.interface';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  token: string;
  id_usuario: string;

  constructor(public http: HttpClient,
    public alertCtrl: AlertController,
    public platform: Platform,
    public storage: Storage,
    ) {
    this.cagar_storage();
    console.log('Hello UsuarioProvider Provider');
  }

  activo(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  ingresar(correo: string, contrasena: string) {

    let data = new FormData();
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    let url = URL_SERVICIOS + "/login";

    return this.http.post(url, data).map((resp: Login) => {
      console.log(resp);
      if (resp.error) {
        this.alertCtrl.create({
          title: "Error al iniciar",
          subTitle: "Informacion Invalida",
          buttons: ["OK"]
        }).present();
      } else {
        this.token = resp.token;
        this.id_usuario = resp.id_usuario;
        this.guardar_storage();
      }
    });

  }

  cerrar_sesion() {
    this.token = null;
    this.id_usuario = null;
    this.guardar_storage();
  }


  guardar_storage() {

    if (this.platform.is('cordova')) {
      this.storage.set('token', this.token)
      this.storage.set('id_usuario', this.id_usuario)
    } else {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id_usuario', this.id_usuario);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');
      }
    }

  }

  cagar_storage() {

    let promesa = new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        this.storage.ready().then(() => {

          this.storage.get('token').then(token => {
            if (token) {
              this.token = token;
            }
            resolve();
          });

          this.storage.get('id_usuario').then(id_usuario => {
            if (id_usuario) {
              this.id_usuario = id_usuario;
            }
            resolve();
          });

        });
      } else {
        if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.id_usuario = localStorage.getItem('id_usuario');
        }
        resolve();
      }

    });
    return promesa;

  }

}
