import { Outlet } from "react-router";
//import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiShoppingCart } from "react-icons/hi2";
import { HiHome } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useState } from "react";
import CartOverView from "../pages/CartOverView";
const LayoutContainer = styled.section`
  /* height: calc(100vh - 5rem); */
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  //background-color: var(--color-grey-50);
  //background-color: purple;
  padding: 2.5rem;
`;
const LayoutHeader = styled.header`
  background-color: var(--color-grey-50);
  //border: 3px solid red;
  //height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1;
`;
const ButtonIcon = styled.button`
  background-color: var(--color-grey-100);
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  transition: all 0.5s;

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-800);
  }
  & svg:hover {
    color: var(--color-brand-600);
  }
`;

function AppLayout() {
  const navigate = useNavigate();
  const [openCartOverView, setOpenCartOverView] = useState(false);
  return (
    <LayoutContainer>
      <LayoutHeader>
        <ButtonIcon onClick={() => navigate("/homePage")}>
          <HiHome />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/cart")}
          onMouseEnter={() => setOpenCartOverView((s) => !s)}
          onMouseLeave={() => setOpenCartOverView((s) => !s)}
        >
          <HiShoppingCart />
          {openCartOverView && <CartOverView />}
        </ButtonIcon>
        <UserInfo />
      </LayoutHeader>
      <Outlet />
    </LayoutContainer>
  );
}

export default AppLayout;
