import { Component, OnInit } from '@angular/core';
import { AuthServiceV2, AuthResponse } from "../../shared/services/authv2.service"; // Import AuthResponse if defined in authv2.service
// import { AuthService } from "../../shared/services/auth.service"; // REMOVED: Consolidating to AuthServiceV2

import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit {

  // Custom validator function for password matching
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const password2 = control.get('password2');

    if (password && password2 && password.value !== password2.value) {
      password2.setErrors({ mismatch: true });
      return { passwordsMismatch: true };
    } else if (password2 && password2.hasError('mismatch')) {
      password2.setErrors(null); // Clear error if they now match
    }
    return null;
  };

  signupform = new FormGroup({
    firstname: new FormControl('', Validators.required),
    secondname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,20}$')
    ]),
    password2: new FormControl('', Validators.required),
  }, { validators: this.passwordMatchValidator });

  constructor(
    // REMOVED: public authService: AuthService,
    public authServiceV2: AuthServiceV2, // Use AuthServiceV2 for all auth-related tasks
    public dialogRef?: MatDialogRef<any>, // Use 'any' or a specific type if you have one for your dialog
    private router: Router
  ) { }

  ngOnInit() {
    this.signupform.get('password')?.valueChanges.subscribe(() => {
      this.signupform.get('password2')?.updateValueAndValidity();
    });
    this.signupform.get('password2')?.valueChanges.subscribe(() => {
      this.signupform.get('password')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.signupform.markAllAsTouched();

    if (this.signupform.valid) {
      const firstname = this.signupform.get('firstname')?.value || '';
      const secondname = this.signupform.get('secondname')?.value || '';
      const email = this.signupform.get('email')?.value || '';
      const password = this.signupform.get('password')?.value || '';
      const password2 = this.signupform.get('password2')?.value || '';

      // --- FIX: Call signup with individual arguments matching AuthServiceV2's new signature ---
      this.authServiceV2.signup(firstname, secondname, email, password, password2).subscribe({
        next: (response: AuthResponse) => { // Specify response type
          this.authServiceV2.UI_message('Signup successful!'); // Use AuthServiceV2's message method
          this.dialogRef?.close(true);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.authServiceV2.UI_message(error.error?.message || 'Signup failed. Please try again.'); // Use AuthServiceV2's message method
        }
      });
    } else {
      this.authServiceV2.UI_message('Please fix the errors in the form.'); // Use AuthServiceV2's message method
      this.displayFormErrors();
    }
  }

  displayFormErrors() {
    Object.keys(this.signupform.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined = this.signupform.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Control: ' + key + ', Errors: ' + JSON.stringify(controlErrors));
      }
    });

    if (this.signupform.hasError('passwordsMismatch')) {
      this.authServiceV2.UI_message('Passwords do not match.'); // Use AuthServiceV2's message method
    }
  }

  hasError(controlName: string, errorName: string): boolean { // Changed return type to boolean, as it's always true/false
    const control = this.signupform.get(controlName);
    return !!(control && control.hasError(errorName) && (control.touched || control.dirty));
  }

  isInvalidAndTouched(controlName: string): boolean { // Changed return type to boolean
    const control = this.signupform.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
