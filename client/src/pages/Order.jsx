import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../ui/Button";
import { useCreateOrder } from "../features/order/useCreateOrder";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../context/cartSlice";
const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  //border: 3px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
`;
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 0.5fr 1fr;
  gap: 1rem;
  font-size: 1.2rem;
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Input = styled.input`
  width: 20rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  padding: 1.2rem 3.2rem;
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function Order() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { createOrder, isLoading } = useCreateOrder();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart?.reduce((acc, el) => acc + el.totalPrice, 0);
  function onSubmit(data) {
    createOrder({ ...data, cart });
    dispatch(clearCart());
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="phoneNumber">phoneNumber</Label>
        <Input
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "this field is required",
            pattern: {
              value:
                /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
              message: "Please provide a valid phoneNumber",
            },
          })}
          disabled={isLoading}
        />
        {errors?.phoneNumber?.message && (
          <Error>{errors.phoneNumber.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="totalPrice">totalPrice</Label>
        <Input
          type="number"
          id="totalPrice"
          {...register("totalPrice")}
          disabled={true}
          defaultValue={totalPrice}
        />
        {errors?.totalPrice?.message && (
          <Error>{errors.totalPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="address">address</Label>
        <Input
          type="text"
          id="address"
          {...register("address", {
            required: "this field is required",
          })}
          disabled={isLoading}
        />

        {errors?.address?.message && <Error>{errors.address.message}</Error>}
      </FormRow>
      <FormRow>
        <Button disabled={isLoading} variations="primary">
          confirm
        </Button>
        <Button disabled={isLoading} type="reset" variations="primary">
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}
export default Order;
