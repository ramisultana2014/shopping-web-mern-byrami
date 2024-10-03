import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../services/apiProducts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useCreateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: (productObj) => createProductApi(productObj),
    onSuccess: (data) => {
      toast.success(`product successfullt created`);
      //data is what coming from loginapi//
      queryClient.setQueryData(["products"]);
      // console.log(data);
      //setQueryData set the cash name user to value data
      // console.log("use", data);
      //replace :true we erase the place where we been befor so if we press back button we dont return to where we ara
      navigate("/homePage", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createProduct, isLoading };
}
