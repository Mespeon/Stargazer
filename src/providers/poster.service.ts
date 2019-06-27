import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PosterService {

  constructor(public http: HttpClient) { 
	console.log('[poster] Service provider ready.');
  }

  randomizeQuote() {
	console.log('Hi, you have reached the randomizeQuote service!');

	// Fetch request
        var urlRequest = new Request('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm');
        return fetch(urlRequest).then(function(response) {
		return response.json();
	}).then(function(quote) { 
		console.log('Sibyl API returned: ', quote['message']);
		return quote['message'];
        }).catch(function(ex) { 
		console.log(ex);
        }).finally(function() {
		console.log('API call resolved.');
	});

	// HTTP Async request
	let getQuote = this.http.get('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm');
	//getQuote.subscribe(data => { quote = data['message']; console.log(quote); }, (ex) => { console.log(ex); }, () => { console.log('API call resolved.'); });
  }
}
