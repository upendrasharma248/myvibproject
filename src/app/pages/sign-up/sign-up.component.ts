import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class SignUpComponent {
  signUpForm: FormGroup;
  submitted = false;
  errorMsg = '';
  successMsg = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    // At least 1 uppercase, 1 lowercase, 1 number, 1 special char, min 8 chars
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return strong.test(value) ? null : { passwordStrength: true };
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';
    this.successMsg = '';
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.http.post('http://localhost:3001/api/signup', formData).subscribe({
        next: (res: any) => {
          this.successMsg = res.message || 'Sign up successful!';
          this.signUpForm.reset();
          this.submitted = false;
          setTimeout(() => {
            this.successMsg = '';
          }, 3000);
        },
        error: (err) => {
          this.errorMsg = err.error?.error || 'Sign up failed. Please try again.';
          setTimeout(() => {
            this.errorMsg = '';
          }, 3000);
        }
      });
    }
  }
}
