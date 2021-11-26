import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private defaultErrorMessage = 'Algo inesperado aconteceu. Tente novamente mais tarde!';

  constructor(
    private toastController: ToastController,
  ) { }

  public async presentToast(
    color: string,
    message: string = this.defaultErrorMessage,
  ) {
    const toast = await this.toastController.create({
      color,
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  public async handleErrorMessage(message: string, error: Error) {
    await this.presentToast('danger', message);
    throw new Error(error.message);
  }

}
