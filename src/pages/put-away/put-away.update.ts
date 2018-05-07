import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { PutAwayService } from '../../services/putaway.service';

@Component({
  selector: 'page-putaway-update',
  templateUrl: 'put-away.update.html'
})
export class PutAwayUpdatePage {

  submitAttempt: boolean = false;
  // FORMS
  putawayForm: FormGroup;
  newlocation: AbstractControl;
  quantity: AbstractControl;
  // DATA
  item: string;
  putaway: string;
  lot: string;
  container: string;
  attribute: string;
  available: string;

  navOptions = {
    animate: true,
    animation: 'transition',
    direction: 'forward'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, private putawayService: PutAwayService) {
    this.putawayForm = formBuilder.group({
      newputaway: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
      quantity: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[0-9 ]*'), Validators.required])],
    });

    this.newlocation = this.putawayForm.controls['newlocation'];
    this.quantity = this.putawayForm.controls['quantity'];
  }

  ionViewDidEnter(){
    this.putaway = this.navParams.get('WHSL');
    this.item = this.navParams.get('ITNO');
    this.lot=this.navParams.get('BANO');
    this.container=this.navParams.get('CAMU');
    this.attribute=this.navParams.get('ATMN');
    this.available=this.navParams.get('STQT')+' '+this.navParams.get('UNMS');
  }

  onSubmit(value: any): void {
    if (this.putawayForm.valid) {
      console.log(this.putawayForm.value);
      let data = {
        WHSL: value.newlocation,
        RPQA: value.quantity
      }

      this.putawayService.get(data).subscribe(
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
