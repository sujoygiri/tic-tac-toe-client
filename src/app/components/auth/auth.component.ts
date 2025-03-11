import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
    additionalIcon?: string;
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
          additionalIcon: 'eye-slash-fill',
        },
      },
      // {
      //   label: 'Confirm Password',
      //   input: {
      //     type: 'password',
      //     id: 'confirm-password',
      //     icon: 'key-fill',
      //     formControlName: 'confirm_password',
      //     additionalIcon: 'eye-slash-fill',
      //   },
      // },
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
          additionalIcon: 'eye-slash-fill',
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
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/
            ),
          ],
        ],
        // confirm_password: ['', [Validators.required]],
      }
      // { updateOn: 'submit' }
    );
    this.signinForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
      { updateOn: 'submit' }
    );
    // this.signupForm
    //   .get('password')
    //   ?.addValidators(
    //     this.checkPasswordMatch(this.signupForm.get('confirm_password')!)
    //   );
    // this.signupForm
    //   .get('confirm_password')
    //   ?.addValidators(
    //     this.checkPasswordMatch(this.signupForm.get('password')!)
    //   );
    // this.signupForm.get('password')?.updateValueAndValidity();
    // this.signupForm.get('confirm_password')?.updateValueAndValidity();
  }

  // checkPasswordMatch(passwordControl: AbstractControl): ValidatorFn {
  //   return (
  //     confirmPasswordControl: AbstractControl
  //   ): ValidationErrors | null => {
  //     if (!passwordControl || !confirmPasswordControl) return null;
  //     const password = passwordControl.value;
  //     const confirmPassword = confirmPasswordControl.value;
  //     if (!password || !confirmPassword) {
  //       return null;
  //     }
  //     return password === confirmPassword ? null : { passwordMismatch: true };
  //   };
  // }

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
        this.authService.signUpPlayer(signUpPlayerData).subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.log(err);
          },
        });
        break;
      }
      case 'signin': {
        const signInPlayerData: UserData = this.signinForm.value;
        console.log(this.signinForm);

        // this.authService.signInPlayer(signInPlayerData).subscribe({
        //   next: (resp) => {
        //     console.log(resp);
        //   },
        //   error: (err) => {
        //     console.log(err);
        //   },
        // });
        break;
      }
      default:
        break;
    }
  }

  showOrHidePassword(element: FromStructure) {
    if (element.input.type === 'password') {
      element.input.additionalIcon = 'eye-fill';
      element.input.type = 'text';
    } else {
      element.input.additionalIcon = 'eye-slash-fill';
      element.input.type = 'password';
    }
  }
}
