import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// 1. Import the libs you need
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploadComponent} from './components/upload/upload.component';
import {ViewBlockComponent} from './components/view-block/view-block.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {VideosContainerComponent} from './components/videos-container/videos-container.component';
import {MatIconModule} from '@angular/material/icon';
import {DialogVideoViewComponent} from './components/dialog-video-view/dialog-video-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SafePipePipe} from './pipes/safe-pipe.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DialogWarningComponent } from './components/dialog-warning/dialog-warning.component';


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
    AppComponent,
    UploadComponent,
    ViewBlockComponent,
    VideosContainerComponent,
    DialogVideoViewComponent,
    SafePipePipe,
    DialogWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [DialogVideoViewComponent, DialogWarningComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
