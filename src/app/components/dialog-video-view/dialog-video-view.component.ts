import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Commentaire, FileUpload} from '../../model/models';
import {FormControl} from '@angular/forms';
import {DownloadService} from '../../services/download.service';
import {DialogWarningComponent} from '../dialog-warning/dialog-warning.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-dialog-video-view',
  templateUrl: './dialog-video-view.component.html',
  styleUrls: ['./dialog-video-view.component.css']
})
export class DialogVideoViewComponent implements OnInit {

  basePath = '';
  src: string;
  currentFile: FileUpload;
  commentFC = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<DialogVideoViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private downloadService: DownloadService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.data && this.data.currentFile) {
      this.basePath = this.data.basePath;
      this.src = this.data.currentFile.url;
      this.currentFile = this.data.currentFile;
    }
  }

  addComment() {
    if (this.commentFC.value && this.commentFC.value !== '') {
      if (!this.currentFile.comments) {
        this.currentFile.comments = [];
      }
      const newComment = new Commentaire(this.commentFC.value);
      this.currentFile.comments.push(newComment);
      this.updateComments();
    }

  }

  updateComments() {
    this.downloadService.update(this.currentFile['id'], this.currentFile.comments, this.basePath)
      .then(res => {
        this.commentFC.reset();
      }, err => {
        console.log(err);
      });
  }

  deleteComment(commentIndex: string) {
    if (!this.currentFile.comments) {
      this.currentFile.comments = [];
      return;
    }

    const dialogRef = this.dialog.open(DialogWarningComponent, {
      width: '400px'
    });

    dialogRef.afterClosed()
      .pipe(
        filter(response => response === true)
      )
      .subscribe(response => {
        this.currentFile.comments = this.currentFile.comments.filter(c => c.id !== commentIndex);
        this.updateComments();
      });
  }

}
