
import { Injectable } from '@angular/core';
import { Http, HttpOptions } from '@capacitor-community/http';
import { ToastController } from '@ionic/angular';

import { StorageService } from '../storage/storage.service';
import { ToastService } from '../toast/toast.service';
import { environment } from 'src/environments/environment';

interface StoredRequest {
  id: string;
  url: string;
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {

  private readonly STORAGE_REQUEST_KEY = 'stored_requests';

  constructor(
    private toastService: ToastService,
    private storageService: StorageService,
    private toastController: ToastController
  ) { }

  async checkForEvents() {
    this.storageService.get<any>(this.STORAGE_REQUEST_KEY)
      .then(async storedOperations => {
        const storedObj = JSON.parse(storedOperations);

        if (storedObj && storedObj.length > 0) {
          try {
            await this.sendRequests(storedObj);

            const toast = this.toastController.create({
              message: 'Dados locais sincronizados com sucesso para a API!',
              duration: 3000,
              color: 'success',
              position: 'bottom'
            });

            toast.then(t => t.present());

            this.storageService.remove(this.STORAGE_REQUEST_KEY);
          } catch (error) {
            console.log(JSON.stringify(error));

            await this.toastService.handleErrorMessage('Erro ao sincronizar dados locais com a API', error);
          }
        }
      });
  }

  public async storeRequest(url: string, type: string, data: any = {}) {
    const toast = this.toastController.create({
      message: 'Seus dados serão armazenados localmente porque você parece estar offline.',
      duration: 3000,
      color: 'warning',
      position: 'bottom'
    });

    toast.then(t => t.present());

    const action: StoredRequest = {
      url,
      type,
      data,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };

    this.storageService.get<any>(this.STORAGE_REQUEST_KEY)
      .then(storedOperations => {
        let storedObj = JSON.parse(storedOperations);

        if (storedObj) {
          storedObj.push(action);
        } else {
          storedObj = [action];
        }

        this.storageService.set(this.STORAGE_REQUEST_KEY, JSON.stringify(storedObj));
      });
  }

  async sendRequests(operations: StoredRequest[]) {
    for (const operation of operations) {
      const options: HttpOptions = {
        url: operation.url,
        headers: {
          'Content-Type': 'application/json',
          accessKey: environment.ACCESS_KEY
        },
        data: operation.data
      };

      await Http.request({ ...options, method: operation.type });
    }
  }
}
