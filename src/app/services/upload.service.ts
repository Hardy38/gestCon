import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {FileUpload} from '../model/models';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;
    downloadURL: Observable<string>;

    private basePath = '/videos';
    private fileUploads: FileUpload[] = [];

    public books: AngularFireList<any[]>;

    constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase,
                private storage: AngularFireStorage) {
    }

    upload(event) {
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
}
