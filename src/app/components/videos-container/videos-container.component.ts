import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogVideoViewComponent} from '../dialog-video-view/dialog-video-view.component';
import {FileUpload} from '../../model/models';
import {DownloadService} from '../../services/download.service';
import {filter, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {DialogWarningComponent} from "../dialog-warning/dialog-warning.component";

@Component({
  selector: 'app-videos-container',
  templateUrl: './videos-container.component.html',
  styleUrls: ['./videos-container.component.css']
})
export class VideosContainerComponent implements OnInit {

  @Input() basePath = '/videos';
  @Output() filesLength = new EventEmitter<number>();

  public fileUploads: FileUpload[] = [];
  private fileUploadsCopy: FileUpload[] = [];
  public searchFC = new FormControl();



  constructor(public dialog: MatDialog, private  downloadService: DownloadService) {
  }

  ngOnInit() {

    this.downloadService.getFileUploads(100, this.basePath).snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({id: c.payload.key, ...c.payload.val()}));
      })
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      this.fileUploadsCopy = Object.assign([], this.fileUploads);
      this.filesLength.emit(fileUploads.length);
    });

    this.searchFC.valueChanges
      .subscribe(searchValue => {
        this.fileUploads = searchValue === '' ? this.fileUploadsCopy :
          this.fileUploadsCopy.filter(value => value.name.toUpperCase().indexOf(searchValue.toString().toUpperCase()) !== -1);
      });
  }

  openDialog(file?: FileUpload): void {
    const dialogRef = this.dialog.open(DialogVideoViewComponent, {
      width: '700px',
      height: '650px',
      data: {currentFile: file, basePath: this.basePath}
    });
  }

  delete(itemToDelete: FileUpload) {

    const dialogRef = this.dialog.open(DialogWarningComponent, {
      width: '400px',
      data: {message: 'Voulez-vous vraiment supprimer ce fichier?'}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(response => response === true)
      )
      .subscribe(response => {
        this.downloadService.delete(itemToDelete['id'], this.basePath)
          .then(
            res => {
            },
            err => {
              console.log(err);
            }
          );
      });
  }
}
