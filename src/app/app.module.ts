import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// IONIC NATIVE
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { WHM3Page } from '../pages/w-hm3/w-hm3';
import { LocationTransferPage } from '../pages/location-transfer/location.transfer';
import { LocationTransferUpdatePage } from '../pages/location-transfer/location.transfer.update';
import { ReceiptPage } from '../pages/receipt/receipt';
import { PutAwayPage } from '../pages/put-away/put-away';
import { PickingPage } from '../pages/picking/picking';
import { ExpeditionPage } from '../pages/expedition/expedition';
import { VisualisationDuStockPage } from '../pages/visualisation-du-stock/visualisation-du-stock';

// SERVICES
import { LocationService } from '../services/location.service';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsControllerPage,
    LoginPage,
    WHM3Page,
    LocationTransferPage,
    LocationTransferUpdatePage,
    ReceiptPage,
    PutAwayPage,
    PickingPage,
    ExpeditionPage,
    VisualisationDuStockPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsControllerPage,
    LoginPage,
    WHM3Page,
    LocationTransferPage,
    LocationTransferUpdatePage,
    ReceiptPage,
    PutAwayPage,
    PickingPage,
    ExpeditionPage,
    VisualisationDuStockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Keyboard,
    Camera,
    BarcodeScanner,
    Toast,
    LocationService
  ]
})
export class AppModule { }