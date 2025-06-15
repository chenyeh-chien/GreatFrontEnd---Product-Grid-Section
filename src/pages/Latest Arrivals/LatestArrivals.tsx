import { clsx } from 'clsx';
import { useProductInfo } from "../../components/utils/hooks";
import BaseButton from "../../components/utils/Button/BaseButton";
import ProductCard from "../../components/utils/Card/Product Card/ProductCard";

export default function ProductGridSection() {
  const [productInfo] = useProductInfo();
  // const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className={clsx(
      'flex flex-col gap-12 self-stretch',
      'px-3 py-12',
      'md:gap-16 md:px-4 md:py-16 xl:p-24'
    )}>
      <header className="flex items-center gap-4 self-stretch justify-between">
        <h1 className="font-semibold text-2xl text-neutral-900">
          Latest Arrivals
        </h1>
        <div>
          <BaseButton 
            text="View all"/>
        </div>
      </header>
      <main className={clsx(
        'md:grid md:grid-cols-[repeat(auto-fit,336px)]',
        'xl:grid-cols-[repeat(auto-fit,280px)]',
        'gap-8 justify-between self-stretch'
      )}>
        {productInfo && productInfo.data && productInfo.data.map(item => {
          return (
          <ProductCard 
            key={item.product_id}
            productID={item.product_id}
            productName={item.name}
            description={item.description}
            productImages={item.images}
            colors={item.colors}
            listPrice={item.inventory[0].list_price}
            salePrice={item.inventory[0].sale_price}/>
          )
        })}
      </main>
    </div>
  )
}