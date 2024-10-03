import { useQuery } from "@tanstack/react-query";
//import toast from "react-hot-toast";
import { getCurrentUserPhoto } from "../../services/apiAuth";
export function useUserPhoto() {
  const { isLoading, data: userPhoto } = useQuery({
    queryKey: ["userPhoto"],
    queryFn: getCurrentUserPhoto,
    retry: false,
    // onSuccess: (data) => {
    //   //console.log(data);
    //   if (data && data.type === "image/png") {
    //     toast.success("User photo successfully fetched:");
    //     // Perform additional logic or side effects here
    //   } else {
    //     toast.success("User photo not found or request failed:");
    //     // Handle the case where user photo is not found or request failed
    //   }
    // },
  });
  //console.log(userPhoto);
  return { userPhoto, isLoading };
}
