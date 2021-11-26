import { Injectable } from '@angular/core';
import { Http, HttpOptions, HttpResponse } from '@capacitor-community/http';

import { ConnectionStatus, NetworkService } from '../network/network.service';
import { OfflineManagerService } from '../offline/offline.service';
import { StorageService } from '../storage/storage.service';
import { Hero } from 'src/app/interfaces/Hero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private readonly API_URL = `${environment.API_URL}/Heroes`;
  private readonly ACCESS_KEY = environment.ACCESS_KEY;

  constructor(
    private storageService: StorageService,
    private networkService: NetworkService,
    private offlineService: OfflineManagerService
  ) { }

  public async getHeroes() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      return this.storageService.get<Hero[]>('heroes');
    } else {
      const options = {
        url: this.API_URL,
        headers: { accessKey: this.ACCESS_KEY },
      };

      const response: HttpResponse = await Http.get(options);
      this.storageService.set('heroes', response.data);
      return response.data as Hero[];
    }
  }

  public async addHeroes(data: Hero) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      return await this.offlineService.storeRequest(this.API_URL, 'POST', data);
    } else {
      const options: HttpOptions = {
        url: this.API_URL,
        headers: {
          'Content-Type': 'application/json',
          accessKey: this.ACCESS_KEY
        },
        data
      };

      return Http.post(options);
    }
  }

  public async removeHeroes(heroId: string) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Offline) {
      const localHeroes = await this.storageService.get<Hero[]>('heroes');
      const newHeroes = localHeroes.filter((obj) => obj.Id !== heroId);
      await this.storageService.set('heroes', newHeroes);
      return await this.offlineService.storeRequest(`${this.API_URL}/${heroId}`, 'DELETE');
    } else {
      const options: HttpOptions = {
        url: `${this.API_URL}/${heroId}`,
        headers: {
          accessKey: this.ACCESS_KEY
        },
      };

      return Http.del(options);
    }
  }

}
