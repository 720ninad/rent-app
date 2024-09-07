import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ILoggedInDetails,
  ILogin,
  IProduct,
  IRegister,
  IShop,
} from '../interface/common-interface.interface';
import { lastValueFrom } from 'rxjs';
import { IUpdateUserInput } from '../interface/inputs';

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  private baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  public async register(user: IRegister): Promise<any> {
    const url = 'api/auth/register';
    const response = await lastValueFrom(
      this.http.post<any>(this.baseUrl + url, user, {})
    );
    return response.body || ({} as any);
  }

  public async login(credentials: ILogin): Promise<ILoggedInDetails> {
    const url = 'api/auth/login';
    const response = await lastValueFrom(
      this.http.post<ILoggedInDetails>(this.baseUrl + url, credentials, {})
    );
    return response || ({} as ILoggedInDetails);
  }

  public async isLoggedIn(): Promise<any> {
    const url = 'api/auth/is-logged-in';
    const response = await lastValueFrom(
      this.http.get<any>(this.baseUrl + url, {})
    );
    return response.body || ({} as any);
  }

  public async logout(): Promise<any> {
    const url = 'api/auth/logout';
    const response = await lastValueFrom(
      this.http.get<any>(this.baseUrl + url, {})
    );
    return response.body || ({} as any);
  }

  public async getAllProducts(): Promise<any> {
    const url = 'api/products/get-all-products';
    const response = await lastValueFrom(
      this.http.get<any>(this.baseUrl + url, {})
    );
    return response.body || ({} as any);
  }

  public async getProductsProductsofOwner(): Promise<any> {
    const url = 'api/product/get-current-shop-product';
    const response = await lastValueFrom(
      this.http.get<any>(this.baseUrl + url, {})
    );
    return response.body || ({} as any);
  }

  public async addNewProduct(payload: IProduct): Promise<any> {
    const url = 'api/product/create';
    const response = await lastValueFrom(
      this.http.post<any>(this.baseUrl + url, payload, {})
    );
    return response.body || ({} as any);
  }

  public async createShop(payload: IShop): Promise<any> {
    const url = 'api/shop/create';
    const response = await lastValueFrom(
      this.http.post<any>(this.baseUrl + url, payload, {})
    );
    return response.body || ({} as any);
  }

  public async updateUser(payload: IUpdateUserInput): Promise<any> {
    const url = 'api/user/update';
    const response = await lastValueFrom(
      this.http.put<any>(this.baseUrl + url, payload, {})
    );
    return response.body || ({} as any);
  }
}
