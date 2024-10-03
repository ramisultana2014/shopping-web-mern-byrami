import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

import toast from "react-hot-toast";
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success(`product successfullt deleted`);
      //data is what coming from loginapi//
      //queryClient.setQueryData(["products"]);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { deleteProduct, isLoading };
}
