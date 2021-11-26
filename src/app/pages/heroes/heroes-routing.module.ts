import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesPage } from './heroes.page';

const routes: Routes = [
  {
    path: '',
    component: HeroesPage
  },
  {
    path: 'add-hero',
    loadChildren: () => import('./add-hero/add-hero.module').then( m => m.AddHeroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesPageRoutingModule {}
