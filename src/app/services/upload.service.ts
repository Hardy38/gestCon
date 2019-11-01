import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
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

  constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
  }

  upload(event) {

    const fileToUpLoad = new FileUpload(event.target.files[0]);
    this.basePath = fileToUpLoad && fileToUpLoad.file.type.indexOf('video/') !== -1 ? '/videos'
      : fileToUpLoad.file.type.indexOf('image/') !== -1 ? '/photos' : '/documents';
    const id = `${this.basePath}/${fileToUpLoad.file.name}`;
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(fileToUpLoad.file);
    this.uploadProgress = this.task.percentageChanges();
    // this.downloadURL = this.task.downloadURL();

    return this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          fileToUpLoad.url = url;
          fileToUpLoad.name = fileToUpLoad.file.name;
          fileToUpLoad.key = id;
          // fileToUpLoad.comments.push('Commentaire test');
          this.saveFileData(fileToUpLoad);
          console.log('url : ', url);
        });
      })
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(this.basePath).push(fileUpload);
  }

}
