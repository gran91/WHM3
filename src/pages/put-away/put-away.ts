import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { PutAwayService } from '../../services/putaway.service';
import { PutAwayUpdatePage } from './put-away.update';

@Component({
  selector: 'page-put-away',
  templateUrl: 'put-away.html'
})
export class PutAwayPage {
  @ViewChild('focusinput') focusinput;

  putawayForm: FormGroup;
  submitAttempt: boolean = false;
  receiptNumber: AbstractControl;
 
  loading: Loading;
 
  navOptions = {
    animate: true,
    animation: 'transition',
    direction: 'forward'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private keyboard: Keyboard, public formBuilder: FormBuilder, private locationService: PutAwayService) {
    this.putawayForm = formBuilder.group({
      receiptNumber: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9 ]*'), Validators.required])],
    });

    this.receiptNumber = this.putawayForm.controls['receiptNumber'];
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
    if (this.putawayForm.valid) {
      this.submitAttempt = true;
      this.presentLoadingDefault();
      let data = {
        REPN: value.receiptNumber
      }

      this.locationService.get(data).subscribe(
        response => {
          this.submitAttempt = false;
          this.loading.dismiss();
          this.navCtrl.push(PutAwayUpdatePage, response, this.navOptions);
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
