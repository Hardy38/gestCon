import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogVideoViewComponent} from '../dialog-video-view/dialog-video-view.component';
import {FileUpload} from '../../model/models';
import {DownloadService} from '../../services/download.service';
import {map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-videos-container',
    templateUrl: './videos-container.component.html',
    styleUrls: ['./videos-container.component.css']
})
export class VideosContainerComponent implements OnInit {

    @Input() basePath = '/videos';
    messages: string[] = ['test 1', 'test 2', 'test 3', 'test 4'];

    public fileUploads: FileUpload[] = [];
    private fileUploadsCopy: FileUpload[] = [];
    public searchFC = new FormControl();



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
        });

        this.searchFC.valueChanges
            .subscribe(searchValue => {
                console.log('Value : ', searchValue)
                this.fileUploads = searchValue === '' ? this.fileUploadsCopy :
                    this.fileUploadsCopy.filter(value => value && value.name && value.name.toUpperCase().indexOf(searchValue.toString().toUpperCase()) !== -1);
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
