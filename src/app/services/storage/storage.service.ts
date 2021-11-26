/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private readonly API_STORAGE_KEY = 'globalthings';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this._storage?.set(`${this.API_STORAGE_KEY}-${key}`, value);
  }

  public get<T>(key: string): Promise<T> {
    return this._storage?.get(`${this.API_STORAGE_KEY}-${key}`);
  }

  public remove(key: string) {
    this._storage?.remove(`${this.API_STORAGE_KEY}-${key}`);
  }

}
