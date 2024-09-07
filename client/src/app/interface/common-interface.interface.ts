export interface IRegister {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userAddress: string;
  accountPassword: string;
}

export interface ILogin {
  email: string;
  accountPassword: string;
}

export interface IUser {
  id: number;
  isShopEnabled: boolean;
  firstname: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  userAddress: string;
  accountPassword: string;
}

export interface IProduct {
  productName: string;
  shopId: number;
  productType: string;
  productCondition: string;
  price: string;
  originalPurchasedDate: string;
  originalPurchaisingRecieptNo: string;
  productDescription: string;
}

export interface IShop {
  ownerId: number;
  shopName: string;
  email: string;
  phoneNumber: string;
  mapLocation: string;
  shopType: string;
  shopDescription: string;
}

export interface ILoggedInDetails {
  isLoggedIn: boolean;
  token: string;
}
