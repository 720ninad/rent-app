import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  
  public title = 'rent-app-client';

  constructor(
   
    private _router: Router
  ) {
    console.log('constructor');
  }


  public async logout(): Promise<void> {
    try {
  
      this._router.navigate(['login']);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  public navigateToAccountPage(): void {
    this._router.navigate(['account']);
  }
}
