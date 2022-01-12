import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../models/general.model';
import { storedArticlesByCategory } from '../../assets/data/mock-news';

const API_KEY = environment.newsApiKey;
const storedArticlesByCategoryData = storedArticlesByCategory;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public getNewsArticles(): Observable<Article[]> {
    return of(storedArticlesByCategoryData.business.articles);
  
    // Next code is for real API call

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
    return of(storedArticlesByCategoryData[category.toLowerCase()].articles);
  
    // Next code is for real API call
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
