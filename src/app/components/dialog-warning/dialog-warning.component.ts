import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.css']
})
export class DialogWarningComponent implements OnInit {
  message = 'Voulez-vous vraiment supprimer ce commentaire?';

  constructor(
    public dialogRef: MatDialogRef<DialogWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.message = this.data && this.data.message ? this.data.message : 'Voulez-vous vraiment supprimer cet élement?';
  }

}
