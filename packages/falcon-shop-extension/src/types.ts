export type Address = {
  id: number;
  firstname: string;
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

export type AddAddressInput = {
  company?: string;
  firstname: string;
  lastname: string;
  telephone: string;
  street: string[];
  postcode: string;
  city: string;
  countryId: string;
  defaultBilling?: boolean;
  defaultShipping?: boolean;
  regionId?: number;
};

export type EditAddressInput = {
  id: number;
  company?: string;
  firstname: string;
  lastname: string;
  telephone?: string;
  street: string;
  postcode: string;
  city: string;
  countryId: string;
  defaultBilling?: boolean;
  defaultShipping?: boolean;
  regionId?: number;
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

export type EditCustomerInput = {
  websiteId: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  defaultBilling?: boolean;
  defaultShipping?: boolean;
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
