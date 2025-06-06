export type Primitive = string | number | boolean;
export type QueryValue = Primitive | Primitive[] | QueryObject;
export type QueryObject = {
    [key: string]: QueryValue;
}
export type QueryParam = [string, Primitive];

type EcommerceProductCollection = {
    image_url: string;
}

export type EcommerceProductImage = {
    color: string;
    image_url: string;
    id?: string;
}

type EcommerceProductInventory = {
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
    pagination: { 
        [key: string]: unknown;    
    }
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