import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WHM3Page } from '../w-hm3/w-hm3';
import { LocationTransferPage } from '../location-transfer/location.transfer';
import { PutAwayPage } from '../put-away/put-away';
import { PickingPage } from '../picking/picking';
import { ExpeditionPage } from '../expedition/expedition';
import { VisualisationDuStockPage } from '../visualisation-du-stock/visualisation-du-stock';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }

  goToWHM3(params){
    if (!params) params = {};
    this.navCtrl.push(WHM3Page);
  }
  
}
