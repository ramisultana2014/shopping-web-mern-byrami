import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import AppLayout from "./ui/AppLayout";
import Cart from "./pages/Cart";
import UserPofile from "./pages/UserPofile";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import PageNotFound from "./ui/PageNotFound";
import Order from "./pages/Order";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="welcome" />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="homePage" />} />
            <Route path="homePage" element={<HomePage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="userProfile" element={<UserPofile />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12} // space between window and toaster
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>

    // <BrowserRouter>
    //   <Routes>
    //     <Route index element={<Navigate replace to="welcome" />} />
    //     <Route path="welcome" element={<Welcome />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="signup" element={<SignUp />} />
    //     <Route element={<AppLayout />}>
    //       <Route index element={<Navigate replace to="homePage" />} />
    //       <Route path="homePage" element={<HomePage />} />
    //       <Route path="heel" element={<Heel />} />
    //       <Route path="dresses" element={<Dresses />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
