export interface IShop {
  shopId: number;
  ownerId: number;
  shopName: string;
  email: string;
  phoneNumber?: string;
  mapLocation: string;
  shopType: string;
  shopDescription: string;
  city: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}
