export interface IOrder {
  orderId: number;
  fromMapLocation: string;
  toMapLocation: string;
  lastStopMapLocation: string;
  orderStatus: string;
  paymentStatus: string;
  productId: number;
  buyerId: number;
  shopId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
