import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {FileUpload} from './model/models';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {UploadService} from './services/upload.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'gestCon';

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;

    downloadURL: boolean;

    private basePath = '/videos';

    constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase,
                private storage: AngularFireStorage, private uploadService: UploadService) {
    }

    ngOnInit() {
        this.uploadProgress = this.uploadService.uploadProgress;
    }

    upload(event) {
        this.uploadService.upload(event)
            .subscribe(() => {
                this.uploadProgress = this.uploadService.uploadProgress;
                this.downloadURL = true;
            });
    }
}
