import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class SignInComponent {
  signInForm: FormGroup;
  submitted = false;
  showPassword = false;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';
    if (this.signInForm.invalid) {
      return;
    }
    this.loading = true;
    const { email, password } = this.signInForm.value;
    this.http.post<any>('http://localhost:3001/api/signin', { email, password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.signInForm.setErrors({ invalid: true });
          this.errorMsg = res?.message || 'Invalid email or password.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.signInForm.setErrors({ invalid: true });
        this.errorMsg = err.error?.message || 'Invalid email or password.';
      }
    });
  }
}
