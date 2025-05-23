import type { EcommerceProductInfo } from "./types";

export function fetchEcommerceProductInfo(): Promise<EcommerceProductInfo> {
    return new Promise((resolve, reject) => {
        const url =
            "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products";
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}