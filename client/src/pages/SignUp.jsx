import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../ui/SignupForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  align-content: center;
  justify-content: center;

  gap: 2rem;
  padding: 0 2rem;
`;
function SignUp() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2">please fill up the form</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default SignUp;
