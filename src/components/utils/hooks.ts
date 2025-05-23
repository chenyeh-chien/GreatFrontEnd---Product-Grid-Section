import { useState, useEffect } from "react";
import type { EcommerceProductList } from "./types";
import { fetchEcommerceProductList } from "./utilFunctions";

export function usePoductList() {
    const [ productList, setProductList ] = 
        useState<EcommerceProductList | null>(null);

    useEffect(() => {
        const fetchProductList = async () => {
            setProductList(await fetchEcommerceProductList());
        }

        fetchProductList();

        return () => {
            
        }
    }, [])

    return [ productList ]
}