import { motion } from "framer-motion";
import { ProductCard } from '@/components/blocks/hero-parallax'

const HeroRows = ({
  products,
  translateX,
  translateXReverse,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  translateX: any;
  translateXReverse: any;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <>
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
        {firstRow.map((product, index) => (
          <ProductCard
            product={product}
            translate={translateX}
            key={product.title}
            isFirst={index === 0}
          />
        ))}
      </motion.div>
      <motion.div className="flex flex-row mb-20 space-x-20">
        {secondRow.map((product) => (
          <ProductCard
            product={product}
            translate={translateXReverse}
            key={product.title}
          />
        ))}
      </motion.div>
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
        {thirdRow.map((product) => (
          <ProductCard
            product={product}
            translate={translateX}
            key={product.title}
          />
        ))}
      </motion.div>
    </>
  );
};
export default HeroRows;