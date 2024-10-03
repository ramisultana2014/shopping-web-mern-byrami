import styled from "styled-components";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const jwtCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("jwt="));
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-grey-50);
    background-color: var(--color-green-700);
    /* width: 8rem; */
    text-align: center;
    padding: 2rem 2rem;
    font-size: 2rem;
    border-radius: 6px;
  }
  &:hover,
  &active {
    color: var(--color-green-100);
    transition: all 0.5s;
  }
`;
function ProtectedRoutes({ children }) {
  const jwt = useSelector((state) => state.cart.token);
  useEffect(() => {
    if (jwt) {
      localStorage.setItem("token", jwt);
    } else {
      localStorage.removeItem("token");
    }
  }, [jwt]);

  if (jwt) return children;
  return (
    <LoginLayout>
      <Heading as="h4">Log in to your account</Heading>
      <StyledLink to="/login">click here</StyledLink>
    </LoginLayout>
  );
}

export default ProtectedRoutes;
