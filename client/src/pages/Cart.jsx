import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import CartUpdateQuantity from "./CartUpdateQuantity";
import { useNavigate } from "react-router-dom";
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-100);
  z-index: 100;
  padding: 2rem;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  width: 100%;
  border-bottom: 2px solid var(--color-grey-300);
  font-weight: 500;
  ${(props) =>
    props.size === "lr" &&
    css`
      font-size: 2rem;
      color: var(--color-indigo-700: );
    `}
`;
const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
`;
const Par = styled.p`
  background-color: var(--color-grey-100);
  padding: 2rem;
`;
const ButtonI = styled.button`
  background-color: var(--color-brand-200);
  display: block;
  //z-index: 999;
  border: none;
  padding: 0.8rem;
  border-radius: var(--border-radius-lg);
  transition: all 0.3s;
  margin-bottom: 2px;
  &:hover {
    background-color: ${(props) =>
      props.type === "red"
        ? "var(--color-red-700 )"
        : "var(--color-brand-100)"};
  }
`;
function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart?.reduce((acc, el) => acc + el.totalPrice, 0);
  if (cart?.length === 0) return <Par>cart is empty</Par>;
  return (
    <Ul>
      {cart.map((el) => (
        <Li key={el.productId}>
          <Img src={`/img/${el.image}`} alt={`${el.title}`} />
          quantity : {el.orderQuantity} price :{el.totalPrice}
          <CartUpdateQuantity id={el.productId} />
        </Li>
      ))}
      <Li size="lr">
        TOTAL PRICE : {totalPrice} ${" "}
        <ButtonI onClick={() => navigate("/order")}>continue to order</ButtonI>
      </Li>
    </Ul>
  );
}

export default Cart;
