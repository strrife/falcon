export type ShopConfig = {
  activeCurrency: string;
  activeStore: string;
  currencies: string[];
  baseCurrency: string;
  stores: ShopStoreEntry[];
  timezone: string;
  weightUnit: string;
};

export type ShopStoreEntry = {
  name: string;
  code: string;
};

export type Address = {
  id: number;
  firstname: String;
  lastname: string;
  street: string[];
  city: string;
  postcode?: string;
  countryId: string;
  company?: string;
  region?: string;
  regionId?: number;
  telephone?: string;
  fax?: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
};

export type Customer = {
  id?: number;
  websiteId?: number;
  addresses?: Address[];
  defaultBilling?: string;
  defaultShipping?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  newsletterSubscriber?: boolean;
};

export type RequestPasswordResetInput = {
  email: string;
};

export type ResetCustomerPasswordInput = {
  resetToken: string;
  password: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  password: string;
};

export type ResetPasswordInput = {
  resetToken: string;
  password: string;
};
