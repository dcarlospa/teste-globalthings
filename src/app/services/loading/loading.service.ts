import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController
  ) { }

  public async presentLoading(message: string = 'Aguarde...') {
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  public async dismissLoading() {
    await this.loading.dismiss();
  }

}
