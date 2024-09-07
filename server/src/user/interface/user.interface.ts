export interface IUser {
  userId?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userAddress: string;
  isShopEnabled: boolean;
  accountPassword: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
