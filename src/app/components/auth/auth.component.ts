import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserData } from '../../interfaces/common.interface';

interface FromStructure {
  label: string;
  input: {
    type: string;
    id: string;
    icon: string;
    formControlName: string;
  };
}

interface AuhForm {
  [key: string]: FromStructure[];
}

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authForm: AuhForm = {
    signup: [
      {
        label: 'Name',
        input: {
          type: 'text',
          id: 'name',
          icon: 'person-circle',
          formControlName: 'name',
        },
      },
      {
        label: 'Email',
        input: {
          type: 'email',
          id: 'email',
          icon: 'envelope-at-fill',
          formControlName: 'email',
        },
      },
      {
        label: 'Password',
        input: {
          type: 'password',
          id: 'password',
          icon: 'key-fill',
          formControlName: 'password',
        },
      },
      {
        label: 'Confirm Password',
        input: {
          type: 'password',
          id: 'confirm-password',
          icon: 'key-fill',
          formControlName: 'confirm_password',
        },
      },
    ],
    signin: [
      {
        label: 'Email',
        input: {
          type: 'email',
          id: 'email',
          icon: 'envelope-at-fill',
          formControlName: 'email',
        },
      },
      {
        label: 'Password',
        input: {
          type: 'password',
          id: 'password',
          icon: 'key-fill',
          formControlName: 'password',
        },
      },
    ],
  };
  currentAuthFormType: string = '';
  currentAuthForm: FromStructure[] = [];
  showOrHideAuthForm: boolean = false;
  signupForm!: FormGroup;
  signinForm!: FormGroup;
  currentFormGroup!: FormGroup;
  currentFocusedFormControl: string = '';
  showOrHidePasswordIcon: string = 'eye-slash-fill';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      { validators: this.checkPasswordMatch }
    );
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  checkPasswordMatch(formGroup: FormGroup): ValidationErrors | null {
    const passwordFormControl = formGroup.get('password');
    const confirmPasswordFormControl = formGroup.get('confirm_password');
    if (!passwordFormControl || !confirmPasswordFormControl) return null;
    const password = passwordFormControl.value;
    const confirmPassword = confirmPasswordFormControl.value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  showAuthForm(type: string) {
    this.currentAuthFormType = type;
    this.currentAuthForm = this.authForm[type];
    this.currentFormGroup =
      type === 'signup' ? this.signupForm : this.signinForm;
    this.showOrHideAuthForm = true;
  }

  handelAuth() {
    switch (this.currentAuthFormType) {
      case 'signup': {
        const signUpPlayerData: UserData = this.signupForm.value;
        console.log(this.signupForm.controls);
        console.log(this.signupForm.errors);

        // this.authService.signUpPlayer(signUpPlayerData).subscribe({
        //   next: (resp) => {
        //     console.log(resp);
        //   },
        //   error: (err) => {
        //     console.log(err);
        //   },
        // });
        break;
      }
      case 'signin': {
        const signInPlayerData: UserData = this.signinForm.value;
        this.authService.signInPlayer(signInPlayerData).subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.log(err);
          },
        });
        break;
      }
      default:
        break;
    }
  }

  showOrHidePassword(element: FromStructure) {
    if (element.input.type === 'password') {
      this.showOrHidePasswordIcon = 'eye-fill';
      element.input.type = 'text';
    } else {
      this.showOrHidePasswordIcon = 'eye-slash-fill';
      element.input.type = 'password';
    }
  }
}
