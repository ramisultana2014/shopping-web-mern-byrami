import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, closewindow, onConfirm, isdeleteing }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h4">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete {resourceName} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button disabled={isdeleteing} onClick={closewindow}>
          Cancel
        </Button>
        <Button disabled={isdeleteing} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
