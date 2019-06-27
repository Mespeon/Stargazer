import { Component } from '@angular/core';

// Providers
import { PosterService } from '../../providers/poster.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public posterService: PosterService) {
	console.log('Tab2 constructed.');
  }

  ngOnInit() {
    
  }
}
