import type { EcommerceProductInfo } from "./types";

export function fetchEcommerceProductInfo(): 
  Promise<EcommerceProductInfo> {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products";
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