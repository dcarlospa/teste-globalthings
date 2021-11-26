import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private plt: Platform,
    private toastController: ToastController
  ) {
    this.plt.ready().then(async () => {
      this.initializeNetworkEvents();
      await this.initializeNetworkStatus();
    });
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  private async initializeNetworkStatus() {
    const status = await Network.getStatus() ? ConnectionStatus.Online : ConnectionStatus.Offline;
    this.status.next(status);
  }

  private initializeNetworkEvents() {
    Network.addListener('networkStatusChange', async status => {
      if (status.connected) {
        console.log('WE ARE ONLINE');
        await this.updateNetworkStatus(ConnectionStatus.Online);
      } else {
        console.log('WE ARE OFFLINE');
        await this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';

    const toast = await this.toastController.create({
      message: `Parece que você está ${connection}`,
      color: 'warning',
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

}
