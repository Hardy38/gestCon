import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogVideoViewComponent} from '../dialog-video-view/dialog-video-view.component';
import {FileUpload} from '../../model/models';
import {DownloadService} from '../../services/download.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-videos-container',
    templateUrl: './videos-container.component.html',
    styleUrls: ['./videos-container.component.css']
})
export class VideosContainerComponent implements OnInit {

    messages: string[] = ['test 1', 'test 2', 'test 3', 'test 4'];

    public fileUploads: FileUpload[] = [];
    private fileUploadsCopy: FileUpload[] = [];

    private basePath = '/videos';

    constructor(public dialog: MatDialog, private  downloadService: DownloadService) {
    }

    ngOnInit() {

        this.downloadService.getFileUploads(6, this.basePath).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
            )
        ).subscribe(fileUploads => {
            this.fileUploads = fileUploads;
            this.fileUploadsCopy = Object.assign([], this.fileUploads);
            console.log('data : ', this.fileUploads);
        });
    }

    openDialog(file?: FileUpload): void {
        const dialogRef = this.dialog.open(DialogVideoViewComponent, {
            width: '500px',
            data: {currentFile: file}
        });
    }

    delete(message: FileUpload) {
        console.log('Deleteeeeeeeeeeeeeeeeee');
    }
}
