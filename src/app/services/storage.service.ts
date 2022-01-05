/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Article } from '../models/general.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  get getLocalArticles(): Article[] {
    return [...this._localArticles];
  }

  async saveRemoveArticle(article: Article) {
    const alreadyExists = this._localArticles.find(a => a.title === article.title);
    if(!!alreadyExists) {
      this._localArticles = this._localArticles.filter(a => a.title !== article.title);
    } else {
      this._localArticles = [article, ...this._localArticles];
    }
    this._storage.set('articles', this._localArticles);
  }

  async loadFavorites(): Promise<Article[]> {
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];
      console.log('StorageService::loadFavorites', this._localArticles);
      return this._localArticles;

    } catch (error) {
      console.error('ERROR: StorageService::loadFavorites', error);
      this._localArticles = [];
    }
  }

  isArticleFavorite(article: Article): boolean {
    return !!this._localArticles.find(a => a.title === article.title);
  }

  constructor(private storage: Storage) {
    this.init();
  }
}
