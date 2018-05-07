import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTransferPage } from '../location-transfer/location.transfer';

@Component({
  selector: 'page-picking',
  templateUrl: 'picking.html'
})
export class PickingPage {

  constructor(public navCtrl: NavController) {
  }
  
  goToLocationTransfer(params){
    if (!params) params = {};
    this.navCtrl.push(LocationTransferPage);
  }

}
