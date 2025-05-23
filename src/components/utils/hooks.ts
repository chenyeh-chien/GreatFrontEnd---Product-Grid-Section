import { useState, useEffect } from "react";
import type { EcommerceProductInfo } from "./types";
import { fetchEcommerceProductInfo } from "./utilFunctions";

export function usePoductInfo() {
    const [productInfo, setProductInfo] = 
        useState<EcommerceProductInfo | null>(null);

    useEffect(() => {
        let isCanceled = false;

        try {
            const fetchProductInfo = async () => {
                setProductInfo(await fetchEcommerceProductInfo());
            }

            fetchProductInfo();
        } catch(error) {
            if (!isCanceled) {
                throw error;
            } 
        }

        return () => {
            isCanceled = true;
        }
    }, [])

    return [productInfo];
}