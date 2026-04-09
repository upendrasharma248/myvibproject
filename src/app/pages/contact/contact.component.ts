import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  private serviceID = 'service_0simsmq';
  private templateID = 'template_tt2e1of';
  private userID = 'mi_pIZgQTEV8O-7ld';

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobno: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    if (this.contactForm.invalid) {
      return;
    }
    this.loading = true;
    const formValues = this.contactForm.value;
    const templateParams = {
      name: formValues.name,
      email: formValues.email,
      mobno: formValues.mobno,
      message: formValues.message
    };
    this.emailService.sendEmail(this.serviceID, this.templateID, templateParams, this.userID)
      .then(() => {
        this.successMessage = `Message sent successfully to ${formValues.email}!`;
        this.contactForm.reset();
        this.submitted = false;
        setTimeout(() => { this.successMessage = ''; }, 5000);
      })
      .catch((error) => {
        this.errorMessage = 'Failed to send message. Please try again.';
        console.error('EmailJS error:', error);
        setTimeout(() => { this.errorMessage = ''; }, 5000);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
