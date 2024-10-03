import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: (orderObj) => createOrderApi(orderObj),
    onSuccess: (data) => {
      toast.success(`order successfully created`);
      //data is what coming from loginapi//
      queryClient.setQueryData(["order"]);
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
  return { createOrder, isLoading };
}
