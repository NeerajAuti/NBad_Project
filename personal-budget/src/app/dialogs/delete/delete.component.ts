import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'pb-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
  }

}
