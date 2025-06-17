import type { 
  QueryObject,
  EcommerceProductData,
  EcommerceCategories,
  EcommerceCollections,
  EcommerceProductInventory,
  EcommerceProductItem
} from "./types";
import inventory from "../../assets/files/inventory.json";



export function toQueryParams(obj: QueryObject): string[][] {
  const results: string[][] = [];

  for (const [key, val] of Object.entries(obj)) {
    if (val == null) {
      continue;
    }

    if (Array.isArray(val)) {
      for (const item of val) {
        results.push([key, String(item)]);
      }
    } else if (typeof val === "object") {
      results.push(...toQueryParams(val));
    } else {
      results.push([key, String(val)]);
    }
  }

  return results;
}

export function toQueryString(params: string[][]) {
  return new URLSearchParams(params).toString();
}

export function fetchEcommerceProductData(queryStr?: string): 
  Promise<EcommerceProductData> {
    return new Promise((resolve, reject) => {
      let url =
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products` ;
      
      if (queryStr) {
        url = `${url}?${queryStr}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

export function fetchEcommerceCategories(): 
  Promise<EcommerceCategories> {
    return new Promise((resolve, reject) => {
      const url =
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/categories`;

      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

export function fetchEcommerceCollections(): 
  Promise<EcommerceCollections> {
    return new Promise((resolve, reject) => {
      const url =
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections`;

      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

export function fetchEcommerceInventory(): 
  Promise<EcommerceProductInventory[]> {
    return new Promise((resolve) => {
      resolve(inventory);
    })
}

export function fetchEcommerceProductByID(id: string): 
  Promise<EcommerceProductItem> {
    return new Promise((resolve, reject) => {
      const url =
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${id}`;

      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    })
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T, 
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(this: unknown, ...args: unknown[]) {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay)
  }
}

export function capitalize(str: string) {
  if (str.length === 0) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}