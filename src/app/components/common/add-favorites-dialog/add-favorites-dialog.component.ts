import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-favorites-dialog',
  templateUrl: './add-favorites-dialog.component.html',
  styleUrls: ['./add-favorites-dialog.component.scss']
})
export class AddFavoritesDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {success:boolean},
    public dialogRef: MatDialogRef<AddFavoritesDialogComponent>,
    ) {}

  ngOnInit(): void {
  }

}
