/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../models/general.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public articles$: Observable<Article[]>;

  ngOnInit() {
    this.articles$ = this.newsService.getNewsArticles();
  }

  constructor(private newsService: NewsService ) {}

}
