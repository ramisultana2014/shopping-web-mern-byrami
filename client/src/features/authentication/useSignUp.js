import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useSignUp() {
  //const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (signupObj) => signUpApi(signupObj),
    onSuccess: (data) => {
      toast.success(`thanks for joining ,please check your email`);
      //data is what coming from loginapi//
      //queryClient.setQueryData(["user"], data.user);
      // console.log(data);
      //setQueryData set the cash name user to value data
      // console.log("use", data);
      //replace :true we erase the place where we been befor so if we press back button we dont return to where we ara
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { signUp, isLoading };
}
