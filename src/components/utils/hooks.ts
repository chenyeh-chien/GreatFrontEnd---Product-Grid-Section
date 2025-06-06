import { useState, useEffect } from "react";
import type { 
    QueryObject,
    EcommerceProductInfo
} from "./types";
import { 
    toQueryParams, 
    toQueryString, 
    fetchEcommerceProductInfo 
} from "./utilFunctions";

// TODO: take optional query parameters
export function usePoductInfo(queryObj?: QueryObject) {
    const [productInfo, setProductInfo] = 
        useState<EcommerceProductInfo | null>(null);

    useEffect(() => {
        let isCanceled = false;

        try {
            const fetchProductInfo = async () => {
                let queryStr: string | undefined;
                if (queryObj) {
                    queryStr = toQueryString(toQueryParams(queryObj));
                }

                setProductInfo(await fetchEcommerceProductInfo(queryStr));
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