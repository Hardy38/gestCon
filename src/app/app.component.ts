import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'gestCon';

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    constructor(private db: AngularFirestore, private afStorage: AngularFireStorage) {
        // const things = db.collection('/').valueChanges();
        // things.subscribe(data => {
        //     console.log('data: ', data);
        // });
    }

    upload(event) {
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
    }
}
