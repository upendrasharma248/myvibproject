import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService, RegistrationData } from '../../services/registration.service';
import { EmailService } from '../../services/email.service';


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


  // EmailJS configuration
  private serviceID = 'service_0simsmq';
  private templateID = 'template_7k9tjm8';
  private userID = 'mi_pIZgQTEV8O-7ld';

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private emailService: EmailService,
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
        // Prepare EmailJS template params
        const templateParams = {
          name: formData.name,
          email: formData.email,
          location: formData.location,
          course: formData.course
        };
        // Send email via EmailJS
        this.emailService.sendEmail(this.serviceID, this.templateID, templateParams, this.userID)
          .then(() => {
            this.successMessage = 'Registration successful! Confirmation email sent.';
            this.registrationForm.reset();
            this.submitted = false;
            this.loading = false;
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/users']);
            }, 1500);
          })
          .catch((error) => {
            this.successMessage = 'Registration successful, but failed to send confirmation email.';
            this.registrationForm.reset();
            this.submitted = false;
            this.loading = false;
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/users']);
            }, 1500);
            console.error('EmailJS error:', error);
          });
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
