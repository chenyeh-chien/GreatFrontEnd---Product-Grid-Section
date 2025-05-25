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