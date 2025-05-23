import { usePoductList } from "../../components/utils/hooks";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";

export default function ProductGridSection() {
    const [ productList ] = usePoductList();

    console.log(productList);

    return (
        <div>
            <ProductCard />
        </div>
    )
}