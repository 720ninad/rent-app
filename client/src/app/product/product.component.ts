import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../service/common-api.service';
import { IProduct } from '../interface/common-interface.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private _commonApiService: CommonApiService) {}
  public productsList: IProduct[] = [];

  async ngOnInit() {
    const response = await this._commonApiService.getAllProducts();
    this.productsList = response.result;
  }

  getStarColor(rating: number, starIndex: number): string {
    const filledStars = Math.floor(rating);
    const remainder = rating - filledStars;

    if (starIndex <= filledStars) {
      return 'gold';
    } else if (starIndex === filledStars + 1 && remainder >= 0.5) {
      return 'gold';
    } else {
      return '#ccc';
    }
  }
}
