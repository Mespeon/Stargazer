import { Component, OnInit } from '@angular/core';

// Providers
import { PosterService } from '../../providers/poster.service';

@Component({
  selector: 'app-sa-home',
  templateUrl: './sa-home.page.html',
  styleUrls: ['./sa-home.page.scss'],
})
export class SaHomePage implements OnInit {

  constructor(public postalOffice: PosterService) { 
    console.log('Home constructed.');
  }

  ngOnInit() {
    
  }

}
