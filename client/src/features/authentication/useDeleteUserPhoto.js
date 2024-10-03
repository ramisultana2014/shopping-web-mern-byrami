import { deleteCurrentUserPhoto } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useDeleteUserPhoto() {
  const { mutate: deleteUserPhoto, isLoading } = useMutation({
    mutationFn: deleteCurrentUserPhoto,
    queryKey: ["userPhoto"],
    onSuccess: () => {
      toast.success(`photo successfully deleted `);
    },
    onError: (err) => {
      //console.log("error", err);
      toast.error("error try a again");
    },
  });
  return { deleteUserPhoto, isLoading };
}
