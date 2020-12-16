import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // public username: string;
  // public password: string;
  public error: string;
  // public firstname: string;
  // public lastname: string;
  SignupForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.SignupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.SignupForm.invalid) {
      return;
    }

    this.loading = true;
    this.http.post('http://localhost:3000/api/signup', this.SignupForm.value)
      .subscribe((res: any) => {
        console.log("result:" + res);

      }, error => {
        this.loading = false;
        console.log(error);
        if (error.status == 200)
          alert(error.error.text);
        else
          this.error = error.error;

        this.router.navigate(['/login']);
      });
  }
  // this.userService.register(this.registerForm.value)
  //     .pipe(first())
  //     .subscribe(
  //         data => {
  //             this.alertService.success('Registration successful', true);
  //             this.router.navigate(['/login']);
  //         },
  //         error => {
  //             this.alertService.error(error);
  //             this.loading = false;
  //         });
}
