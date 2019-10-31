import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-dialog-video-view',
    templateUrl: './dialog-video-view.component.html',
    styleUrls: ['./dialog-video-view.component.css']
})
export class DialogVideoViewComponent implements OnInit {

    fileName: string
    src: string;

    constructor(
        public dialogRef: MatDialogRef<DialogVideoViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        console.log('data :', this.data)
        if (this.data && this.data.currentFile) {
            this.fileName = this.data.currentFile.name;
            this.src = this.data.currentFile.url;
        }
    }

}
