export type Primitive = string | number | boolean;
export type QueryValue = Primitive | Primitive[] | QueryObject;
export type QueryObject = {
  [key: string]: QueryValue;
}
export type QueryParam = [string, Primitive];

type EcommerceCategory = {
  category_id: string;
  name: string;
  created_at: string;
}

type EcommerceProductCollection = {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export type EcommerceProductImage = {
  color: string;
  image_url: string;
  id?: string;
}

export type EcommerceProductInventory = {
  product_id: string;
  sku: string;
  color: string | null;
  size: string | number | null;
  list_price: number;
  sale_price: number;
  stock: number;
}

export type EcommerceProductInfo = {
  title: string;
  description: string[];
}

export type EcommerceProductItem = {
  product_id: string;
  name: string;
  description: string;
  collection: EcommerceProductCollection;
  colors: string[];
  images: EcommerceProductImage[];
  info: EcommerceProductInfo[];
  inventory: EcommerceProductInventory[];
  rating: number;
  sizes: (number | string)[];
  [key: string]: unknown;
}

export type EcommerceProductData = {
  data: EcommerceProductItem[];
}

export type EcommerceCategories = {
  data: EcommerceCategory[];
  pagination: { 
    [key: string]: unknown;    
  }
}

export type EcommerceCollections = {
  data: EcommerceProductCollection[];
}

export type EcommerceFilterData = {
  collections: EcommerceCollections;
  categories: EcommerceCategories;
  inventory: EcommerceProductInventory[];
}

export type NavbarLink = {
  id: number;
  name: string;
  path: string;
}

export type EcommerceProductQueryParameters = {
  collections: string[];
  category: string[];
  colors: string[];
  rating: number[];
}

type EcommerceCartProduct = {
  product_id: string;
  name: string;
  description: string;
}

type EcommerceCartUnit = {
  sku: string;
  list_price: number;
  sale_price: number;
  size: string | number | null;
  color: string | null;
  stock: number;
  image_url: string;
}

export type EcommerceCartItem = {
  product: EcommerceCartProduct;
  unit: EcommerceCartUnit;
  total_list_price: number;
  total_sale_price: number;
  quantity: number;
  created_at: string;
}