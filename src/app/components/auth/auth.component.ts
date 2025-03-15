import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthData } from '../../interfaces/common.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  animations: [
    trigger('slidInTop', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      transition(':enter', [
        animate('400ms 0s ease-in', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
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
  responseFetching: boolean = false;
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
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*=|()_+{}\[\]:;'"<>,.?~\\/-]).{8,}$/
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
      { updateOn: 'blur' }
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
    this.showOrHideAuthForm = !this.showOrHideAuthForm;
    this.currentFormGroup.reset();
  }

  handelAuth() {
    switch (this.currentAuthFormType) {
      case 'signup': {
        const signUpPlayerData: AuthData = this.signupForm.value;
        this.responseFetching = true;
        this.authService.signUpPlayer(signUpPlayerData).subscribe({
          next: (resp) => {
            this.responseFetching = false;
            console.log(resp);
          },
          error: (err) => {
            this.responseFetching = false;
            console.log(err);
          },
        });
        break;
      }
      case 'signin': {
        const signInPlayerData: AuthData = this.signinForm.value;
        this.responseFetching = true;
        this.authService.signInPlayer(signInPlayerData).subscribe({
          next: (resp) => {
            console.log(resp);
            this.responseFetching = false;
          },
          error: (err) => {
            console.log(err);
            this.responseFetching = false;
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
      element.input.additionalIcon = 'eye-fill';
      element.input.type = 'text';
    } else {
      element.input.additionalIcon = 'eye-slash-fill';
      element.input.type = 'password';
    }
  }
}
