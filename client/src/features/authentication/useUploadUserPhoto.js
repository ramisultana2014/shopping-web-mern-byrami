import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadUserPhoto as uploadUserPhotoApi } from "../../services/apiAuth";
export function useUploadUserPhoto() {
  const { mutate: uploadUserPhoto, isLoading } = useMutation({
    mutationFn: (photoFile) => uploadUserPhotoApi(photoFile),
    queryKey: ["userPhoto"],
    onSuccess: () => {
      toast.success(`photo successfully uploaded `);
    },
    onError: (err) => {
      //console.log("error", err);
      toast.error("error try a again");
    },
  });
  return { uploadUserPhoto, isLoading };
}
