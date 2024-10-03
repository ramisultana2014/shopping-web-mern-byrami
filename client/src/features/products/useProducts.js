import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";
export function useProducts() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "category", value: filterValue };
  const sortByValue = searchParams.get("sort");
  const sortBy = !sortByValue ? null : { field: "sort", value: sortByValue };

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", filter, sortBy],
    queryFn: () => getAllProducts({ filter, sortBy }),
  });
  //console.log("datause", products, isLoading);
  return { products, isLoading };
}
