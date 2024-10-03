import { useDispatch, useSelector } from "react-redux";
import {
  decreasQuantity,
  increasquantity,
  deleteItem,
} from "../context/cartSlice";
import toast from "react-hot-toast";
import styled from "styled-components";
const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  padding: 2rem;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonX = styled.button`
  background: none;
  border: none;
`;
const ButtonIcon = styled.button`
  //background-color: var(--color-grey-100);
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  transition: all 0.5s;
  background: none;

  & span {
    font-size: 3rem;
  }
`;
function CartUpdateQuantity({ id }) {
  const cart = useSelector((state) => state.cart.cart);
  //console.log(cart);
  const selectedItem = cart?.find((el) => el.productId === id);
  const quantity = selectedItem.orderQuantity;
  function handleIncrease() {
    if (quantity >= 3) {
      toast.error("Sorry you cant add more");
      return;
    }
    dispatch(increasquantity(selectedItem.productId));
  }
  const dispatch = useDispatch();
  return (
    <Ul>
      <Li>
        <ButtonIcon
          onClick={() => dispatch(decreasQuantity(selectedItem.productId))}
        >
          <span>-</span>
        </ButtonIcon>
        <p> {quantity}</p>
        <ButtonIcon onClick={handleIncrease}>
          <span>+</span>
        </ButtonIcon>
      </Li>
      <div>
        <ButtonX onClick={() => dispatch(deleteItem(selectedItem.productId))}>
          ❌
        </ButtonX>
      </div>
    </Ul>
  );
}

export default CartUpdateQuantity;
