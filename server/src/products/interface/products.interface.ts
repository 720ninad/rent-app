export interface IProduct {
  productId: number;
  productName: string;
  shopId: number;
  productType?: string;
  productCondition?: string;
  price?: number;
  originalPurchasedDate?: Date;
  originalPurchasingReceiptNo?: string;
  productDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
