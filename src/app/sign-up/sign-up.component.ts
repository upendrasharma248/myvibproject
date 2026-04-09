import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userId: ['', [Validators.required, Validators.minLength(4)]],
      designation: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      location: ['', Validators.required],
      // ...existing form controls...
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      // Store signup data in local storage
      localStorage.setItem('lvc-signup-data', JSON.stringify(formData));
      // Optionally, show a success message or reset the form
      alert('Signup successful! Your data has been saved.');
      this.signUpForm.reset();
    }
  }

  // ...existing code...
}