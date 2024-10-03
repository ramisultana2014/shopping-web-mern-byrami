import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToken } from "../../context/cartSlice";
import { useDispatch } from "react-redux";
export function useLogin() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (loginObj) => loginApi(loginObj),
    onSuccess: (data) => {
      //console.log(data.token);
      toast.success(`welcome back ${data.data.user.name} `);
      dispatch(addToken(data.token));
      //data is what coming from loginapi//
      queryClient.setQueryData(["user"], data.data.user);
      // console.log(data);
      //setQueryData set the cash name user to value data
      // console.log("use", data);
      //replace :true we erase the place where we been befor so if we press back button we dont return to where we ara
      navigate("/homePage", { replace: true });
    },
    onError: (err) => {
      //console.log("error", err);
      toast.error("Provided email or password are inccorrect");
    },
  });
  return { login, isLoading };
}
//console.log(data) is
// data:{
//   "user": {
//       "_id": "6612599c9fb66f19d6833ed4",
//       "name": "carol",
//       "role": "user",
//       "email": "rami.sultana@gmail.com",
//       "photo": "default-user.jpg",
//       "active": true,
//       "createdAt": "2024-04-07T08:30:20.919Z",
//       "updatedAt": "2024-04-07T08:30:59.410Z",
//       "__v": 0,
//       "id": "6612599c9fb66f19d6833ed4"
//   }
// }
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// export function useLogin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: (loginObj) => loginApi(loginObj),
//     onSuccess: (data) => {
//       toast.success(`welcome back ${data.user.name} `);
//       //data is what coming from loginapi//
//       queryClient.setQueryData(["user"], data.user);
//       // console.log(data);
//       //setQueryData set the cash name user to value data
//       // console.log("use", data);
//       //replace :true we erase the place where we been befor so if we press back button we dont return to where we ara
//       navigate("/homePage", { replace: true });
//     },
//     onError: (err) => {
//       //console.log("error", err);
//       toast.error("Provided email or password are inccorrect");
//     },
//   });
//   return { login, isLoading };
// }
