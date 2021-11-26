import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { Category } from 'src/app/interfaces/Category';
import { Hero } from 'src/app/interfaces/Hero';
import { CategoryService } from 'src/app/services/category/category.service';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.page.html',
  styleUrls: ['./add-hero.page.scss'],
})
export class AddHeroPage implements OnInit {

  private heroForm: FormGroup;
  private categories: Category[];

  constructor(
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private heroService: HeroesService,
    private navController: NavController,
    private toastService: ToastService,
    private categoryService: CategoryService
  ) { }

  async ngOnInit() {
    this.initHeroForm();
    await this.getHeroCategories();
  }

  private initHeroForm(): void {
    this.heroForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      CategoryId: [null, [Validators.required]],
      Active: [true]
    });
  }

  private async getHeroCategories() {
    this.categories = await this.categoryService.getCategories();
    this.setsFirstCategoryAsDefault(this.categories);
  }

  private setsFirstCategoryAsDefault(categories: Category[]) {
    this.heroForm.patchValue({
      CategoryId: categories[0].Id
    });
  }

  private async addHero(hero: Hero) {
    try {
      await this.loadingService.presentLoading();
      await this.heroService.addHeroes(hero);
      await this.navController.navigateRoot('tabs/heroes');
    } catch (error) {
      await this.toastService.handleErrorMessage('Erro ao adicionar herói. Tente novamente mais tarde', error);
    } finally {
      await this.loadingService.dismissLoading();
    }
  }

}
