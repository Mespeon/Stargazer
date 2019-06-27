import { Component, OnInit } from '@angular/core';

// Providers
import { PosterService } from '../../providers/poster.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  randomtext: any;
  dialga: any;
  didEnter: boolean = false;

  constructor(public posterService: PosterService) { 
	console.log('Tab4 constructed.');
  }

  // On view initialize (first time load)
  ngOnInit() {
	this.randomize();
	this.didEnter = true;
  }

  // On view reentry
  ionViewWillEnter() {
	if (this.didEnter == false) { this.didEnter = true; this.randomize(); }
  }

  // On view leave
  ionViewWillLeave() {
	console.log('Leaving Tab4: stopping timers.');
	try {
		clearTimeout(this.dialga);
		this.didEnter = false;
		console.log('Tab4: stopped timers.');
	}
	catch(ex) {
		console.log(ex);
	}
  }

  async randomize() {
	this.randomtext = await this.posterService.randomizeQuote();
	if (this.didEnter == true) this.roarOfTime();
  }

  roarOfTime() {
	this.dialga = setTimeout(() => {
		console.log('Getting another random quote...');
		this.randomize();
	}, 5000);
  }
}
