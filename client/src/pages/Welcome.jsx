import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
const StyledBgWelcome = styled.div`
  height: calc(100vh - 5rem);
  margin: 1rem;
  padding: 2.5rem 5rem;
  background-image: linear-gradient(
      rgba(36, 42, 46, 0.65),
      rgba(36, 42, 46, 0.65)
    ),
    url("img/main.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20rem;
`;
const StyledDivLink = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
`;
const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-grey-50);
  }
  &:hover,
  &active {
    color: var(--color-red-700);
    transition: all 0.5s;
  }
`;
function Welcome() {
  return (
    <StyledBgWelcome>
      <StyledDiv>
        <Heading as="h1" color="white">
          Welcome To Online Shopping
        </Heading>
      </StyledDiv>
      <StyledDivLink>
        <StyledLink to="/signUp">signUp</StyledLink>
        <StyledLink to="/login">log in</StyledLink>
      </StyledDivLink>
    </StyledBgWelcome>
  );
}

export default Welcome;
