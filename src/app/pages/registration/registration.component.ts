import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService, RegistrationData } from '../../services/registration.service';


import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  // Replace with your actual EmailJS values

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    if (this.registrationForm.invalid) {
      return;
    }
    this.loading = true;
    const formData: RegistrationData = this.registrationForm.value;
    this.registrationService.register(formData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.registrationForm.reset();
        this.submitted = false;
        this.loading = false;
        // Redirect to user component after short delay
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/users']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Registration failed. Please try again.';
        this.loading = false;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
