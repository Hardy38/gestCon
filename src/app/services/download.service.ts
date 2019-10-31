import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {

    constructor(private db: AngularFireDatabase) {
    }

    getFileUploads(numberItems, basePath: string): AngularFireList<any> {
        return this.db.list(basePath, ref =>
            ref.limitToLast(numberItems));
    }
}
