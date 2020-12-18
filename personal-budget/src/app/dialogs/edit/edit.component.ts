import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'pb-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }

}
