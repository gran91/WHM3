import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'page-location-transfer-update',
  templateUrl: 'location.transfer.update.html'
})
export class LocationTransferUpdatePage {

  submitAttempt: boolean = false;
  // FORMS
  locationForm: FormGroup;
  newlocation: AbstractControl;
  quantity: AbstractControl;
  // DATA
  item: string;
  location: string;
  lot: string;
  container: string;
  attribute: string;
  available: string;

  navOptions = {
    animate: true,
    animation: 'transition',
    direction: 'forward'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, private locationService: LocationService) {
    this.locationForm = formBuilder.group({
      newlocation: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      quantity: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9 ]*'), Validators.required])],
    });

    this.newlocation = this.locationForm.controls['warehouse'];
    this.quantity = this.locationForm.controls['quantity'];
  }

  ionViewDidEnter(){
    this.location = this.navParams.get('WHSL');
    this.item = this.navParams.get('ITNO');
    this.lot=this.navParams.get('BANO');
    this.container=this.navParams.get('CAMU');
    this.attribute=this.navParams.get('ATMN');
    this.available=this.navParams.get('STQT')+' '+this.navParams.get('UNMS');
  }

  onSubmit(value: any): void {
    if (this.locationForm.valid) {
      console.log(this.locationForm.value);
      let data = {
        WHLO: value.warehouse,
        WHSL: value.location,
        ITNO: value.item
      }

      this.locationService.get(data).subscribe(
        response => {
          console.log(response);
          this.navCtrl.push('HomePage', response, this.navOptions);
        },
        error => {
          this.showErrorMessage('Primary')
          this.navCtrl.push('HomePage', error, this.navOptions);
        } 
      );
    }
  }

  showErrorMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass: 'toast-error'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
