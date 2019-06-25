import { Component } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Components
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private http: HttpClient, public toasty: ToastController) {
    console.log('Tab3 constructed.');
  }

    testClick() {
        console.log('Hello World!');
        this.testComms();
    }

    testComms() {
        console.log('Reaching out to API.');

        // Pull a request from API
        this.http.get('https://marknolledo.pythonanywhere.com/sibyl/ionic/testcomm').subscribe(data => { console.log(data); this.giveToast(data['message']); }, (error) => console.log(error), () => console.log('API call successful.') );
    }

    // Toasty toast
    async giveToast(message) {
        const toast = await this.toasty.create({
            message: message,
            duration: 3000
        });
        toast.present();
        console.log('Here, have a toast.');
    }

}
