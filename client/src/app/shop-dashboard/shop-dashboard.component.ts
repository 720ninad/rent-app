import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonApiService } from '../service/common-api.service';
import {
  IShop,
} from '../interface/common-interface.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.css'],
})
export class ShopDashboardComponent implements OnInit {
  createShopForm!: FormGroup;
  productForm!: FormGroup;
  products!: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private _commonApiService: CommonApiService,
    private matDialog: MatDialog
  ) {}

  async ngOnInit() {
   
      const response =
        await this._commonApiService.getProductsProductsofOwner();
      this.products = response.result;
    
    this.createShopForm = this._formBuilder.group({
      shopName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      mapLocation: ['', Validators.required],
      shopType: ['', Validators.required],
      shopDescription: ['', Validators.required],
    });

    this.productForm = this._formBuilder.group({
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productCondition: ['', Validators.required],
      price: ['', Validators.required],
      originalPurchasedDate: ['', Validators.required],
      originalPurchasingRecieptNo: ['', Validators.required],
      productDescription: ['', Validators.required],
    });
  }

  async createShop() {
    if (this.createShopForm.valid) {
      const newShop: IShop = this.createShopForm.value;
      try {
        const createShopResponse = await this._commonApiService.createShop(
          newShop
        );
        if (!createShopResponse.isSuccess) {
          throw new Error('create new Shop failed');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.createShopForm.markAllAsTouched();
    }
  }

  async openDialog() {
    const dialogRef = this.matDialog.open(AddProductComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      const response =
        await this._commonApiService.getProductsProductsofOwner();
      this.products = response.result;
    });
  }
}
