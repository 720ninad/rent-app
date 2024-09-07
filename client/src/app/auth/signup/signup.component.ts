import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/interface/common-interface.interface';
import { CommonApiService } from 'src/app/service/common-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonApiService: CommonApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      accountPassword: ['', Validators.required],
    });
  }

  public async register() {
    if (this.signupForm.valid) {
      const user: IRegister = this.signupForm.value;
      user.phoneNumber = user.phoneNumber.toString();
      try {
        const response = await this._commonApiService.register(user);
        console.log('response---------: ', response);
        if (!response.isSuccess) {
          throw new Error('registration failed');
        }
        this._router.navigate(['login']);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
