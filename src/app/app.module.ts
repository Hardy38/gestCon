import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// 1. Import the libs you need
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
    apiKey: 'AIzaSyC36ZWYLTyS1gzMNLbw-LYZSQGPzk1_5H4',
    authDomain: 'poc-gestion-connaissances.firebaseapp.com',
    databaseURL: 'https://poc-gestion-connaissances.firebaseio.com',
    projectId: 'poc-gestion-connaissances',
    storageBucket: 'poc-gestion-connaissances.appspot.com',
    messagingSenderId: '712204687451',
    appId: '1:712204687451:web:f2f07742eb77330dd4477e',
    measurementId: 'G-CQQPL8RXLF'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        AngularFireModule.initializeApp(config),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule // storage
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
