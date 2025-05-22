import { useEffect } from "react";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard"

export default function ProductGridSection() {
    useEffect(() => {
        fetchEcommerceProductList().then(data => console.log(data));
    }, [])

    function fetchEcommerceProductList() {
        return new Promise((resolve, reject) => {
            const url =
                "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products";
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        })
    }

    return (
        <div>

        </div>
    )
}