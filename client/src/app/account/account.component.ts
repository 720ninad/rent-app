import { Component, OnInit } from '@angular/core';
import { IUser } from '../interface/common-interface.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public userDetails: IUser = {} as IUser;
  public userDetailsFields: (keyof IUser)[] = [];

  public ngOnInit(): void {
    this.userDetailsFields = Object.keys(this.userDetails) as (keyof IUser)[];
  }
}
