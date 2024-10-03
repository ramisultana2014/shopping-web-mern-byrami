import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading };
}
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// export function useUser() {
//   const queryClient = useQueryClient(); // Get the query client
//   const user = queryClient.getQueryData(["user"]); // Get user data from cache
//   //console.log(user);
//   const { data, isLoading } = useQuery({
//     queryKey: ["user"],
//     queryFn: () => getCurrentUser, // Replace fetchCurrentUser with your user fetching function
//     enabled: !user, // Enable query only if user data is not available in cache
//   });
//   //console.log("data", data);
//   return { data, isLoading };
// }
