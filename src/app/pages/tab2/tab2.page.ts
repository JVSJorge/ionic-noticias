import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from '../../models/general.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
  public selectedCategory = this.categories[0];
  public articles$: Observable<Article[]>;
  public segmentChanged($event) {
    this.selectedCategory = $event.detail.value;
    this.articles$ = this.newsService.getNewsArticlesByCategory(this.selectedCategory);
  }

  ngOnInit() {
    this.articles$ = this.newsService.getNewsArticlesByCategory(this.selectedCategory);
  }

  constructor(private newsService: NewsService) {}

}
