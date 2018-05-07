import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { LocationService } from '../../services/location.service';
import { LocationTransferUpdatePage } from './location.transfer.update';

@Component({
  selector: 'page-location-transfer',
  templateUrl: 'location.transfer.html'
})
export class LocationTransferPage {
  @ViewChild('focusinput') focusinput;

  locationForm: FormGroup;
  submitAttempt: boolean = false;
  warehouse: AbstractControl;
  location: AbstractControl;
  item: AbstractControl;
  lot: AbstractControl;
  container: AbstractControl;

  loading: Loading;
  isCollapsed: boolean = true;

  navOptions = {
    animate: true,
    animation: 'transition',
    direction: 'forward'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private keyboard: Keyboard, public formBuilder: FormBuilder, private locationService: LocationService) {
    this.locationForm = formBuilder.group({
      warehouse: ['', Validators.compose([Validators.maxLength(3), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      location: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      item: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9 ]*')])],
      lot: ['', Validators.compose([Validators.maxLength(10)])],
      container: ['', Validators.compose([Validators.maxLength(10)])]
    });

    this.warehouse = this.locationForm.controls['warehouse'];
    this.location = this.locationForm.controls['location'];
    this.item = this.locationForm.controls['item'];
  }

  ionViewLoaded() {
    this.focusinput.setFocus();
    setTimeout(() => {
      this.keyboard.show();
      this.focusinput.setFocus();
    }, 150); //a least 150ms.
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    /*setTimeout(() => {
      loading.dismiss();
    }, 5000);*/
  }

  onSubmit(value: any): void {
    if (this.locationForm.valid) {
      this.submitAttempt = true;
      this.presentLoadingDefault();
      let data = {
        WHLO: value.warehouse,
        WHSL: value.location,
        ITNO: value.item,
        BANO: value.lot,
        CAMU: value.container
      }

      this.locationService.get(data).subscribe(
        response => {
          this.submitAttempt = false;
          this.loading.dismiss();
          this.navCtrl.push(LocationTransferUpdatePage, response, this.navOptions);
        },
        error => {
          console.log(error.message);
          this.showErrorMessage(error.error);
          this.submitAttempt = false;
          this.loading.dismiss();
        }
      );
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
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
