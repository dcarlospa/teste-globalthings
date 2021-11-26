import { Injectable } from '@angular/core';
import { Http, HttpResponse } from '@capacitor-community/http';

import { ConnectionStatus, NetworkService } from '../network/network.service';
import { StorageService } from '../storage/storage.service';
import { Category } from 'src/app/interfaces/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API_URL = `${environment.API_URL}/Category`;
  private readonly ACCESS_KEY = environment.ACCESS_KEY;

  constructor(
    private storageService: StorageService,
    private networkService: NetworkService
  ) { }

  public async getCategories() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      return await this.storageService.get<Category[]>('categories');
    } else {
      const options = {
        url: this.API_URL,
        headers: { accessKey: this.ACCESS_KEY },
      };

      const response: HttpResponse = await Http.get(options);
      this.storageService.set('categories', response.data);
      return response.data as Category[];
    }
  }
}
