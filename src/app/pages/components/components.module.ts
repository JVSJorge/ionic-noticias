import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArticleComponent,
    ArticlesComponent
  ],
  exports: [
    ArticlesComponent
  ]
})
export class ComponentsModule { }
