import styled, { css } from "styled-components";

const Button = styled.button`
  border: none;

  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.2rem;
      padding: 0.4rem 0.8rem;
      text-transform: uppercase;
      font-weight: 600;
      text-align: center;
    `}
  ${(props) =>
    props.size === "meduim" &&
    css`
      font-size: 1.4rem;
      padding: 1.2rem 1.4rem;
      font-weight: 500;
      text-transform: uppercase;
    `}
  ${(props) =>
    props.variations === "primary" &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-brand-600);
      padding: 0.6rem;

      &:hover {
        background-color: var(--color-brand-700);
      }
    `}
`;

export default Button;
