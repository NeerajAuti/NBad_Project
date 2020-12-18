import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Issue } from 'src/app/models/issue';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pb-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    public dataService: DataService) { }

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
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }

}
