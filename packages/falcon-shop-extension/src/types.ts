import { Pagination, Aggregation } from '@deity/falcon-data';

export type GraphQLBase = {
  __typename?: string;
};

export type ShopConfig = {
  activeCurrency: string;
  activeStore: string;
  currencies: string[];
  baseCurrency: string;
  stores: ShopStoreEntry[];
  timezone: string;
  weightUnit: string;
} & GraphQLBase;

export type ShopStoreEntry = {
  name: string;
  code: string;
} & GraphQLBase;

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
} & GraphQLBase;

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
} & GraphQLBase;

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

export type FilterInput = {
  field: string;
  operator: FilterOperator;
  value: string[];
};

export enum FilterOperator {
  /** can bee used also as `inSet`, when array is passed */
  equals = 'eq',
  /** can be used as `notInSet` when array is passed */
  notEquals = 'neq',
  lessThan = 'lt',
  lessThanOrEquals = 'lte',
  greaterThan = 'gt',
  greaterThanOrEquals = 'gte',
  /** in the set */
  inSet = 'in',
  /** not in the set */
  notInSet = 'nin',
  /** in the range */
  range = 'range'
}

export type CartItem = {
  itemId: number;
  sku: string;
  qty: number;
  name?: string;
  availableQty?: number;
  price?: number;
  productType?: string;
  priceInclTax?: number;
  rowTotal?: number;
  rowTotalInclTax?: number;
  rowTotalWithDiscount?: number;
  taxAmount?: number;
  taxPercent?: number;
  discountAmount?: number;
  discountPercent?: number;
  weeeTaxAmount?: number;
  weeeTaxApplied?: boolean;
  thumbnailUrl?: string;
  urlKey?: string;
  link?: string;
  itemOptions?: CartItemOption[];
} & GraphQLBase;

export type CartItemOption = {
  label: string;
  value: string;
  data: CartItemOptionValue[];
} & GraphQLBase;

export type CartItemOptionValue = {
  qty: string;
  name: string;
  price: string;
} & GraphQLBase;

export type CartTotal = {
  code: string;
  title: string;
  value: number;
} & GraphQLBase;

export type CouponInput = {
  couponCode: string;
};

export type CartItemPayload = {
  itemId: number;
  sku: string;
  qty: number;
  name?: string;
  price: number;
  productType?: string;
} & GraphQLBase;

export type AddToCartInput = {
  sku: string;
  qty: number;
  configurableOptions?: ConfigurableOptionInput[];
  bundleOptions: BundleOptionInput[];
};

export type ConfigurableOptionInput = {
  optionId: number;
  value: number;
};

export type BundleOptionInput = {
  optionId: number;
  optionQty: number;
  optionSelections?: number[];
};

export type RemoveCartItemInput = {
  itemId: number;
};

export type RemoveCartItemPayload = {
  itemId: number;
} & GraphQLBase;

export type UpdateCartItemInput = {
  itemId: number;
  sku: string;
  qty: number;
};

export type ProductList = {
  items: Product[];
  aggregations: Aggregation[];
  pagination: Pagination;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  image?: string;
  urlPath: string;
  thumbnail?: string;
  price: ProductPrice;
  tierPrices?: ProductTierPrice[];
  currency: string;
  description: string;
  stock: Stock;
  type: string;
  configurableOptions: ConfigurableProductOption[];
  bundleOptions: BundleProductOption[];
  gallery: GalleryEntry[];
  seo: ProductSeo;
  breadcrumbs: Breadcrumb[];
};

export type ProductPrice = {
  regular: number;
  special?: number;
  minTier?: number;
};

export type ProductTierPrice = {
  qty: number;
  value: number;
  discount: number;
};

export type Stock = {
  isInStock: boolean;
  qty: number;
};

export type BundleProductOption = {
  optionId: number;
  position: number;
  productLinks: BundleProductOptionLink[];
  required: boolean;
  sku: string;
  title: string;
  type: string;
};

export type BundleProductOptionLink = {
  canChangeQuantity: number;
  name: string;
  catalogDisplayPrice: string;
  id: string;
  isDefault: boolean;
  optionId: number;
  position: number;
  price: string;
  priceType: string;
  qty: number;
  sku: string;
};

export type GalleryEntry = {
  type: string;
  full: string;
  thumbnail: string;
  embedUrl?: string;
};

export type ConfigurableProductOption = {
  id: string;
  attributeId: string;
  label?: string;
  position: string;
  productId: string;
  values: ConfigurableProductOptionValue[];
};

export type ConfigurableProductOptionValue = {
  inStock: string;
  label: string;
  valueIndex: string;
};

export type ProductSeo = {
  title: string;
  description: string;
  keywords: string;
};

export type Breadcrumb = {
  name: string;
  urlPath?: string;
};

export type Category = {
  id: string;
  name: string;
  children: Category[];
  description: string;
  breadcrumbs: Breadcrumb[];
  products: ProductList;
};

export type SignInInput = {
  email: string;
  password: string;
};
