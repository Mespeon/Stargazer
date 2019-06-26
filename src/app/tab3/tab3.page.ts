import { Component } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Components
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  messeji: string = 'If the call to the randomizer is successful, this will be replaced with something else.';

  constructor(private http: HttpClient, public toasty: ToastController, public loadstuff: LoadingController) {
    console.log('Tab3 constructed.');
  }

    testClick() {
        console.log('Hello World!');
        this.testComms();
    }

    fetchMe() {
        // GET request from API but using Promise.fetch()
        fetch('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm').then(function(response) { console.log(response); return response.json(); }).then(function(message) { console.log('Status returned by API call: ', message['status']); console.log('Message returned by API call: ', message['message']); return message['message']}).catch(function(ex) { console.log('An error has occurred. ', ex); });
    }

    async testComms() {
	// Loading Controller
	const loading = await this.loadstuff.create({
		message: 'Testing GET...'
	});
	await loading.present();

	console.log('Reaching out to API.');

        // GET request from API
        this.http.get('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm').subscribe(data => { console.log(data); this.giveToast(data['message']); return data['message']; }, (error) => console.log(error), () => { console.log('API call successful.'); loading.dismiss(); });
    }

    async testPoster() {
	// Loading Controller
	const loading = await this.loadstuff.create({
		message: 'Testing POST...'
	});
	await loading.present();
	
        console.log('Trying to POST something.');
	let samplePost = new FormData();
	samplePost.append('message', 'Hello World from a fetch() POST!');

        // POST using fetch()
	//fetch('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm', { method: 'POST', body: samplePost }).then(function(response) { console.log(response); }).catch(function(ex) { console.log(ex); });

        // POST using http.get.post()
        let request = this.http.post('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm', samplePost);
        request.subscribe(result => {
            console.log(result);
            this.giveToast(result['reply']);
        }, (error) => console.log('An error occurred: ', error), () => { console.log('Call to API resolved.'); loading.dismiss(); });
    }

    async testReplace() {
	// Loading Controller
	const loading = await this.loadstuff.create({
		message: 'Randomizing...'
	});
	await loading.present();

	// Subscribe to the quoteReplace Observable
        let quoteReplace = this.http.get('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm');
        quoteReplace.subscribe(quote => { this.messeji = quote['message']; }, (ex) => console.log('An error occurred: ', ex), () => { console.log('Call resolved.'); loading.dismiss(); });
    }

    // Toasty toast
    async giveToast(message) {
        const toast = await this.toasty.create({
            header: 'Sibyl API',
            message: message,
            duration: 3000
        });
        toast.present();
        console.log('Here, have a toast.');
    }
}
