import ProductItem from "../features/products/ProductItem";
import { useProducts } from "../features/products/useProducts";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import Empty from "../ui/Empty";
import ProductOperations from "../ui/ProductOperations";
import Menus from "../ui/Menus";

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
`;
function HomePage() {
  const { products, isLoading } = useProducts();
  //console.log(products);
  if (isLoading) return <Spinner />;
  //console.log(products);
  if (!products.length) return <Empty resourceName="product" />;
  return (
    <>
      <Menus>
        <ProductOperations />
        <ContainerDiv>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ContainerDiv>
      </Menus>
    </>
  );
}

export default HomePage;
