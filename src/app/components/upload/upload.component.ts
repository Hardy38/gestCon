import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    documentsPath = `/documents`;
    photosPath = `/photos`;

    public videosLength: number;
    public photosLength: number;
    public documentsLength: number;

    constructor() {
    }

    ngOnInit() {
    }

}
