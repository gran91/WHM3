import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTransferPage } from '../location-transfer/location.transfer';
import { PutAwayPage } from '../put-away/put-away';
import { PickingPage } from '../picking/picking';
import { ExpeditionPage } from '../expedition/expedition';
import { VisualisationDuStockPage } from '../visualisation-du-stock/visualisation-du-stock';

@Component({
  selector: 'page-w-hm3',
  templateUrl: 'w-hm3.html'
})
export class WHM3Page {

  constructor(public navCtrl: NavController) {
  }
  
  goToLocationTransfer(params){
    if (!params) params = {};
    this.navCtrl.push(LocationTransferPage);
  }
  
  goToPutAway(params){
    if (!params) params = {};
    this.navCtrl.push(PutAwayPage);
  }
  
  goToPicking(params){
    if (!params) params = {};
    this.navCtrl.push(PickingPage);
  }
  
  goToExpedition(params){
    if (!params) params = {};
    this.navCtrl.push(ExpeditionPage);
  }
  
  goToVisualisationDuStock(params){
    if (!params) params = {};
    this.navCtrl.push(VisualisationDuStockPage);
  }
}
