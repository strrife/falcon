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
  addresses?: [Address];
  defaultBilling?: string;
  defaultShipping?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  newsletterSubscriber?: boolean;
};
