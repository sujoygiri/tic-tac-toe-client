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
import { AlertComponent } from '../utility/alert/alert.component';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

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
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
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
          id: 'player_name',
          icon: 'person-circle',
          formControlName: 'player_name',
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
  showOrHideAlert: boolean = false;
  alertBgColor: string = '';
  alertMessage: string = '';
  alertIcon: string = '';
  timeOutCount: number = 4000;
  timeoutId: number | undefined = undefined;

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        player_name: ['', [Validators.required, Validators.minLength(3)]],
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
            console.log(resp);
            if (!resp?.data) {
              this.responseFetching = false;
              this.router.navigateByUrl('/auth');
              return;
            }
            this.responseFetching = false;
            this.globalService.userDetails = resp.data;
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.log(err);
            this.responseFetching = false;
            this.alertMessage = err.error?.message
              ? err.error?.message || err.error?.options?.description
              : err.statusText;
            this.alertBgColor = 'bg-rose-600';
            this.alertIcon = 'exclamation-diamond-fill';
            this.showOrHideAlert = true;
            window.clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(() => {
              this.showOrHideAlert = false;
            }, this.timeOutCount);
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
            if (!resp?.data) {
              this.responseFetching = false;
              this.router.navigateByUrl('/auth');
              return;
            }
            this.responseFetching = false;
            this.globalService.userDetails = resp.data;
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.log(err);
            this.responseFetching = false;
            this.alertMessage = err.error?.message
              ? err.error?.message || err.error?.options?.description
              : err.statusText;
            this.alertBgColor = 'bg-rose-600';
            this.alertIcon = 'exclamation-diamond-fill';
            this.showOrHideAlert = true;
            window.clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(() => {
              this.showOrHideAlert = false;
            }, this.timeOutCount);
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

  closeAlert(event: boolean) {
    this.showOrHideAlert = event;
    window.clearTimeout(this.timeoutId);
  }
}
