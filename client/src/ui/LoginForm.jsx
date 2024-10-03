import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useLogin } from "../features/authentication/useLogin";
import SpinnerMini from "./SpinnerMini";
const Form = styled.form`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 6px;
  padding: 2.4rem 4rem;
`;
const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.2rem 0;
`;
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  padding: 0.8rem 1.2rem;
`;
const Label = styled.label`
  font-weight: 500;
`;
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    const loginObj = {
      email,
      password,
    };
    login(loginObj);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <StyledFormRow>
        <Label htmlFor="email">email address</Label>
        <Input
          value={email}
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          autoComplete="username"
        />
      </StyledFormRow>
      <StyledFormRow>
        <Label htmlFor="password">password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          disabled={isLoading}
          autoComplete="current-password"
        />
      </StyledFormRow>
      <Button size="meduim" variations="primary" disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : " log in"}
      </Button>
    </Form>
  );
}

export default LoginForm;
