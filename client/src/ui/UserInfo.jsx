import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "./SpinnerMini";
import { useUserPhoto } from "../features/authentication/useUserPhoto";
import { HiMiniPower } from "react-icons/hi2";
import { useQueryClient } from "@tanstack/react-query";
const UserInfoCont = styled.div`
  display: flex;
  align-items: center;
  //gap: 1rem;
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
    color: var(--color-brand-600);
  }
  & svg:hover {
    color: var(--color-grey-800);
  }
`;
const UserPhoto = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  transition: all 0.5s;
  &:hover {
    outline: 2px solid var(--color-brand-600);
  }
`;
function UserInfo() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  //console.log(user);
  const { userPhoto, isLoading: isLoadingPhoto } = useUserPhoto();
  const queryClient = useQueryClient();
  //console.log(userPhoto);
  //console.log("user", user);
  function handlesignOut() {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  }
  if (isLoading) return <SpinnerMini />;
  const { name, photo } = user.data || user;

  const defaultp = `/img/${photo}`;
  const photoSrc = userPhoto ? URL.createObjectURL(userPhoto) : defaultp;
  return (
    <UserInfoCont>
      <span>{name}</span>
      <ButtonIcon onClick={() => navigate("/userProfile")}>
        {isLoadingPhoto ? (
          <SpinnerMini />
        ) : (
          <UserPhoto src={photoSrc} alt={`profilephoto of ${name}`} />
        )}
      </ButtonIcon>
      <ButtonIcon onClick={handlesignOut}>
        <HiMiniPower />
      </ButtonIcon>
    </UserInfoCont>
  );
}

export default UserInfo;
