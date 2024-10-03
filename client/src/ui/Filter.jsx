import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ filterField, options }) {
  const [searchParams, setSearchParama] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;
  //currentFilter if nothing yet in url it will be options[0].value which is all
  function handleClick(value) {
    //http://localhost:5173/cabins?discount=with-discount
    //http://localhost:5173/cabins?discount=with-discount
    //http://localhost:5173/cabins?discount=all
    searchParams.set(filterField, value); //=http://localhost:5173/cabins?discount=with-discount
    setSearchParama(searchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter ? "active" : ""}
          disabled={option.value === currentFilter ? "active" : ""}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;