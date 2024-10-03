import { useForm } from "react-hook-form";
import { useSignUp } from "../features/authentication/useSignUp";
import styled from "styled-components";
import Button from "./Button";
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
  grid-template-columns: 10rem 1fr 1fr;
  gap: 1rem;
  font-size: 1.8rem;
  padding: 1.2rem 0;

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
  width: 100%;
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

function SignupForm() {
  const { signUp, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  function onSubmit({ name, email, password, passwordConfirm }) {
    signUp(
      { name, email, password, passwordConfirm },
      { onSettled: () => reset() }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is required" })}
          disabled={isLoading}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this filed is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isLoading}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="password">password</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
          disabled={isLoading}
        />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="passwordConfirm">Repeat Password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "this field is requierd",
            validate: (value) =>
              value === getValues().password || "Password need to be matched",
          })}
          disabled={isLoading}
        />
        {errors?.passwordConfirm?.message && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Button disabled={isLoading} variations="primary">
          Submit
        </Button>
        <Button disabled={isLoading} type="reset" variations="primary">
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
