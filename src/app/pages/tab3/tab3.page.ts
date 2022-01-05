/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { Article } from '../../models/general.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[] {
    return this.storage.getLocalArticles;
  }

  constructor(private storage: StorageService) {}

}
