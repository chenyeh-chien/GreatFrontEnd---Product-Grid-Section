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
  color: string;
  list_price: number;
  sale_price: number;
  stock: number;
}

export type EcommerceProductItem = {
  product_id: string;
  name: string;
  description: string;
  collection: EcommerceProductCollection;
  colors: string[];
  images: EcommerceProductImage[];
  inventory: EcommerceProductInventory[];
  [key: string]: unknown;
}

export type EcommerceProductInfo = {
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