import { useState } from "react";
import styled from "styled-components";
const FormUploadPhoto = styled.form`
  height: 10rem;
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
//i included closewindow here , its come from Modal.window its clone here child and pass closewindow to it , so Uploadphoto is the child
function Uploadphoto({
  uploadUserPhoto,
  //avatar,
  isUploading,
  //setAvatar,
  closewindow,
}) {
  const [avatar, setAvatar] = useState(null);
  function handlesubmit(e) {
    e.preventDefault();
    if (!avatar) return;
    uploadUserPhoto(avatar);
    closewindow?.();
  }
  return (
    <FormUploadPhoto onSubmit={handlesubmit}>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        disabled={isUploading}
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      <ButtonI disabled={isUploading} mar="m-r">
        submit
      </ButtonI>
      <ButtonI disabled={isUploading} type="reset" onClick={closewindow}>
        Cancel
      </ButtonI>
    </FormUploadPhoto>
  );
}

export default Uploadphoto;
