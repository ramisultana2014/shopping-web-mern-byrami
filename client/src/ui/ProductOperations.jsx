import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import styled from "styled-components";
const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
function ProductOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "All product" },
          { value: "bags", label: "bags" },
          { value: "dress", label: "dress" },
          { value: "gold", label: "gold" },
          { value: "heel", label: "heel" },
        ]}
      />

      <SortBy
        options={[
          { value: "", label: "sort by price" },
          {
            value: "-price",
            label: "(high first)",
          },
          { value: "price", label: "(low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductOperations;
