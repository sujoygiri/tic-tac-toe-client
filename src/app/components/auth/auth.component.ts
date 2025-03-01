import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
          icon: '',
          formControlName: 'name',
        },
      },
      {
        label: 'Email',
        input: {
          type: 'email',
          id: 'email',
          icon: '',
          formControlName: 'email',
        },
      },
      {
        label: 'Password',
        input: {
          type: 'password',
          id: 'password',
          icon: '',
          formControlName: 'password',
        },
      },
      {
        label: 'Confirm Password',
        input: {
          type: 'password',
          id: 'password',
          icon: '',
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
          icon: '',
          formControlName: 'email',
        },
      },
      {
        label: 'Password',
        input: {
          type: 'password',
          id: 'password',
          icon: '',
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  showAuthForm(type: string) {
    this.currentAuthFormType = type;
    this.currentAuthForm = this.authForm[type];
    this.showOrHideAuthForm = true;
  }
}
