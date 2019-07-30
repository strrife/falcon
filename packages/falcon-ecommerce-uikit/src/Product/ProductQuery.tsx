export type ProductData = {
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
  stock: any; // Stock
  type: string;
  configurableOptions: ConfigurableProductOption[];
  bundleOptions: []; // [BundleProductOption]
  gallery: GalleryEntry[];
  seo: any; // ProductSeo
  breadcrumbs: any;
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

export type GalleryEntry = {
  type: string;
  full: string;
  thumbnail?: string;
  embedUrl?: string;
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
