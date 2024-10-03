import { useSelector } from "react-redux";
import styled from "styled-components";
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 7rem;
  right: 40rem;
  background-color: var(--color-grey-100);
  z-index: 100;
  padding: 2rem;
  //transform: translate(50%, 15%);
  @media screen and (max-width: 700px) {
    /* Example media query */
    left: 40rem; /* Adjust styles for smaller screens */
    background-color: var(--color-grey-400);
  }
  @media screen and (min-width: 700px) and (max-width: 1000px) {
    /* Example media query */
    right: 40rem; /* Adjust styles for smaller screens */
    ackground-color: var(--color-grey-100);
  }

  @media screen and (min-width: 1200px) {
    /* Example media query */
    right: 50rem; /* Adjust styles for smaller screens */
  }
  @media screen and (min-width: 1500px) {
    /* Example media query */
    right: 70rem; /* Adjust styles for smaller screens */
  }
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  width: 100%;
`;
const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
`;
const Par = styled.p`
  top: 8rem;
  right: 50%;
  position: absolute;
  background-color: var(--color-grey-100);
  z-index: 100;
  padding: 2rem;
  //transform: translate(50%, 15%);
`;
function CartOverView() {
  const cart = useSelector((state) => state.cart.cart);
  if (cart?.length === 0) return <Par>cart is empty</Par>;
  return (
    <Ul>
      {cart.map((el) => (
        <Li key={el.productId}>
          <Img src={`/img/${el.image}`} alt={`${el.title}`} />
          quantity : {el.orderQuantity} price :{el.totalPrice}
        </Li>
      ))}
    </Ul>
  );
}

export default CartOverView;
