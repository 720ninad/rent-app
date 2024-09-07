import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ShopDashboardComponent } from './shop-dashboard/shop-dashboard.component';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'  },
  { path: 'register', title: 'Rent-App - Register', component: SignupComponent,  },
  { path: 'login', title: 'Rent-App - Login', component: LoginComponent,  },
  { path: 'shop-dashboard', title: 'Rent-App - Shop Dashboard', component: ShopDashboardComponent,  },
  { path: 'products', title: 'Rent-App - Products', component: ProductComponent,  },
  { path: 'account', title: 'Rent-App - My Account', component: AccountComponent,  },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
