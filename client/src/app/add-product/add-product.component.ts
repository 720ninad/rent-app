import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  IProduct } from '../interface/common-interface.interface';
import { CommonApiService } from '../service/common-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonApiService: CommonApiService,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  public ngOnInit(): void {
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

  async addNewProduct() {
    if (this.productForm.valid) {
      const newProduct: IProduct = this.productForm.value;
      try {
        const response = await this._commonApiService.addNewProduct(newProduct);
        if (!response.isSuccess) {
          throw new Error('add new Product failed');
        } else {
          this.dialogRef.close();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
