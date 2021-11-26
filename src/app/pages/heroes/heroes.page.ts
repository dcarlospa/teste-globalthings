import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Hero } from 'src/app/interfaces/Hero';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.page.html',
  styleUrls: ['./heroes.page.scss'],
})
export class HeroesPage {

  private heroes: Hero[];

  constructor(
    private alertController: AlertController,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private heroService: HeroesService
  ) { }

  async ionViewWillEnter() {
    await this.getHeroes();
  }

  private async getHeroes(): Promise<void> {
    try {
      await this.loadingService.presentLoading();
      this.heroes = await this.heroService.getHeroes();
    } catch (error) {
      await this.toastService.handleErrorMessage('Erro a carregar heróis. Tente novamente mais tarde', error);
    } finally {
      await this.loadingService.dismissLoading();
    }
  }

  private async deleteHero(heroId: string): Promise<void> {
    await this.removeHeroConfirm(heroId);
  }

  private async removeHeroConfirm(heroId: string) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: '<strong>Você esta prestes a apagar esse hero. Deseja continuar</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: async () => {
            try {
              await this.heroService.removeHeroes(heroId);
              await this.getHeroes();
            } catch (error) {
              await this.toastService.handleErrorMessage('Erro a deletar heróis. Tente novamente mais tarde', error);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async doRefresh(event: { target: { complete: () => void } }) {
    await this.getHeroes();
    event.target.complete();
  }
}
