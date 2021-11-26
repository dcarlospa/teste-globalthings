import { Component } from '@angular/core';

import { ConnectionStatus, NetworkService } from './services/network/network.service';
import { OfflineManagerService } from './services/offline/offline.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService
  ) {

    this.networkService.onNetworkChange()
      .subscribe(async (status: ConnectionStatus) => {
        if (status === ConnectionStatus.Online) {
          await this.offlineManager.checkForEvents();
        }
      });
  }
}
