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

    downloadURL: Observable<string>;

    private basePath = '/videos';
    private fileUploads: FileUpload[] = [];


    constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase,
                private storage: AngularFireStorage, private uploadService: UploadService) {
        // const things = db.collection('/').valueChanges();
        // things.subscribe(data => {
        //     console.log('data: ', data);
        // });
    }

    ngOnInit() {
        // this.uploadProgress = this.uploadService.uploadProgress;
        // this.uploadProgress = this.uploadService.uploadProgress
        // this.afStorage.storage.ref().getDownloadURL()
        //   .then(url => {
        //     console.log('url : ', url)
        //   })

        // this.db.list(this.basePath).snapshotChanges()
        //   .subscribe(data => {
        //     console.log('data : ', data)
        //   })


        this.getFileUploads(6).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(fileUploads => {
            this.fileUploads = fileUploads;
            console.log('data : ', this.fileUploads);
        });
    }

    upload(event) {
        this.uploadService.upload(event);
        const fileToUpLoad = new FileUpload(event.target.files[0]);
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(fileToUpLoad.file);
        this.uploadProgress = this.task.percentageChanges();
        // this.downloadURL = this.task.downloadURL();

        this.task.snapshotChanges().pipe(
            finalize(() => {
              this.downloadURL = this.ref.getDownloadURL();
              this.downloadURL.subscribe(url => {
                fileToUpLoad.url = url;
                fileToUpLoad.name = fileToUpLoad.file.name;
                fileToUpLoad.key = Math.random().toString(36).substring(2);
                this.saveFileData(fileToUpLoad);
                console.log('url : ', url);
              });
            })
        )
            .subscribe();
    }

    private saveFileData(fileUpload: FileUpload) {
        this.db.list(this.basePath).push(fileUpload);
    }

    pushFileToStorage(event): Observable<any> {
        const fileUpload = new FileUpload(event.target.files[0]);
        const filePath = `${this.basePath}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(downloadURL => {
                    console.log('File available at', downloadURL);
                    fileUpload.url = downloadURL;
                    fileUpload.name = fileUpload.file.name;
                    this.saveFileData(fileUpload);
                });
            })
        ).subscribe();

        return uploadTask.percentageChanges();
    }

    getFileUploads(numberItems): AngularFireList<any> {
        return this.db.list(this.basePath, ref =>
            ref.limitToLast(numberItems));
    }
}
