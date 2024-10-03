import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { useDeleteUserPhoto } from "../features/authentication/useDeleteUserPhoto";
import SpinnerMini from "../ui/SpinnerMini";
import { useUserPhoto } from "../features/authentication/useUserPhoto";
import { useUploadUserPhoto } from "../features/authentication/useUploadUserPhoto";
import Modal from "../ui/Modal";
import Uploadphoto from "../ui/Uploadphoto";
import UploadProduct from "../ui/UploadProduct";
const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40rem;
  align-content: start;
  justify-content: center;
  gap: 3.2rem;

  /* background-color: var(--color-grey-50); */
`;

const UserPhoto = styled.img`
  display: block;
  width: 20rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;
const DivImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
`;
const DivImgBu = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  /* border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem; */
  gap: 2rem;
`;
const ButtonI = styled.button`
  background-color: var(--color-brand-200);
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  ${(props) => (props.mar === "m-r" ? "margin-right:0.5rem;" : "")}
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.type === "red"
        ? "var(--color-red-700 )"
        : "var(--color-brand-100)"};
    transform: translateY(-3px);
  }
`;
const DivText = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: 600;
  align-items: center;

  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
`;

function UserPofile() {
  const { user, isLoading } = useUser();
  const { uploadUserPhoto, isLoading: isUploading } = useUploadUserPhoto();
  //console.log(user);
  const { userPhoto, isLoading: isLoadingPhoto } = useUserPhoto();
  const { deleteUserPhoto, isLoading: isDelete } = useDeleteUserPhoto();

  //console.log(avatar);
  //console.log(userPhoto);
  //console.log("user", user.data);
  if (isLoading) return <SpinnerMini />;

  const { name, photo, email, updatedAt, role } = user?.data;

  const defaultp = `/img/${photo}`;
  const photoSrc = userPhoto ? URL.createObjectURL(userPhoto) : defaultp;
  return (
    <Container>
      <Modal>
        <DivImg>
          {isLoadingPhoto ? (
            <SpinnerMini />
          ) : (
            <UserPhoto src={photoSrc} alt={`profilephoto of ${name}`} />
          )}
          <DivImgBu>
            <Modal.Open nameToOpenWidow="uploadPhoto">
              <ButtonI>upload photo</ButtonI>
            </Modal.Open>
            <Modal.Window name="uploadPhoto">
              <Uploadphoto
                isUploading={isUploading}
                uploadUserPhoto={uploadUserPhoto}
              />
            </Modal.Window>
            <ButtonI
              type="red"
              disabled={!userPhoto || isDelete}
              onClick={() => deleteUserPhoto()}
            >
              delete photo
            </ButtonI>
          </DivImgBu>
        </DivImg>
        <DivText>
          <li>Name: {name}</li>
          <li>Email :{email}</li>
          <li>Last time updated: {new Date(updatedAt).toDateString()}</li>
          {/* <DivImgBu>
          <ButtonI>update info</ButtonI>
        </DivImgBu> */}
        </DivText>
        {role === "admin" && (
          <Modal.Open nameToOpenWidow="uploadProduct">
            <ButtonI>upload product</ButtonI>
          </Modal.Open>
        )}
        <Modal.Window name="uploadProduct">
          <UploadProduct />
        </Modal.Window>
      </Modal>
    </Container>
  );
}

export default UserPofile;
