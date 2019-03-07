import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

// Servicios
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// Pipes
import { ImagenPipe } from "../pipes/imagen/imagen";
import { HomePage, ProductoPage, CarritoPage, CategoriasPage, LoginPage, OrdenesDetallePage, OrdenesPage, TabsPage, PorCategoriasPage } from '../pages/index.paginas';
import { BuscarPage } from '../pages/buscar/buscar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImagenPipe,
    ProductoPage,
    CarritoPage, CategoriasPage, LoginPage, OrdenesDetallePage, OrdenesPage, TabsPage, PorCategoriasPage,
    BuscarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductoPage,
    CarritoPage, CategoriasPage, LoginPage, OrdenesDetallePage, OrdenesPage, TabsPage, PorCategoriasPage, BuscarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule { }
