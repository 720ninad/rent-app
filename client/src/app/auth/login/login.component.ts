import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interface/common-interface.interface';
import { CommonApiService } from 'src/app/service/common-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonApiService: CommonApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      accountPassword: ['', Validators.required],
    });
  }

  public async login(): Promise<void> {
    if (this.loginForm.valid) {
      const credentials: ILogin = this.loginForm.value;
      try {
        const response = await this._commonApiService.login(credentials);
        console.log('response: ', response);
        if (!response.isLoggedIn) {
          throw new Error('Invalid Credential');
        }
        this._router.navigate(['home']);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public forgotPassword() {
    throw new Error('Method not implemented.');
  }
}
