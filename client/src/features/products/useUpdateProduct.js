import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "../../services/apiProducts";

import toast from "react-hot-toast";
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: ({ dataObj, id }) => updateProductApi({ dataObj, id }),
    onSuccess: (data) => {
      toast.success(`product successfullt updated`);
      //data is what coming from loginapi//
      //queryClient.setQueryData(["products"]);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      // console.log(data);
      //setQueryData set the cash name user to value data
      // console.log("use", data);
      //replace :true we erase the place where we been befor so if we press back button we dont return to where we ara
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { updateProduct, isLoading };
}
