export type EcommerceProductImage = {
    color: string;
    image_url: string;
    id?: string;
}

type EcommerceProductCollection = {
    image_url: string;
}

export type EcommerceProductItem = {
    product_id: string;
    collection: EcommerceProductCollection;
    images: EcommerceProductImage[];
    [key: string]: unknown;
}

export type EcommerceProductInfo = {
    data: EcommerceProductItem[];
    pagination: { 
        [key: string]: unknown;    
    }
}