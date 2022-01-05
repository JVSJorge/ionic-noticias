import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../models/general.model';

const API_KEY = environment.newsApiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public getNewsArticles(): Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        apiKey: API_KEY
      }
    }).pipe(
      pluck('articles')
    );
  }

  public getNewsArticlesByCategory(category: string): Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        category,
        apiKey: API_KEY
      }
    }).pipe(
      pluck('articles')
    );
  }

  constructor(private http: HttpClient) { }
}
