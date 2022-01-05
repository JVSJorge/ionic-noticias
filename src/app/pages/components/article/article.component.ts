/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input } from '@angular/core';
import { Article } from '../../../models/general.model';
import { ActionSheetController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;

  public onOpenArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url, '_blank');
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');
  }

  async onOpenMenu() {
    const isArticleFavorite = await this.storageService.isArticleFavorite(this.article);
    const share = {
      text: 'Share',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
    };

    const defaultButtons = [
      {
        text: isArticleFavorite ? 'Remove Favorite' : 'Favorite',
        icon: isArticleFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite(),
      },
      {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    if (this.platform.is('capacitor')) {
      defaultButtons.unshift(share);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'action-sheet',
      buttons: defaultButtons,
    });

    await actionSheet.present();
  }

  private onShareArticle() {
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    );
  }

  private onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private storageService: StorageService,
    private actionSheetController: ActionSheetController
  ) {}
}
