//const API_URL = "https://shopping-web-api.onrender.com";
// const jwtCookie = document.cookie
//   .split("; ")
//   .find((row) => row.startsWith("jwt="));

// const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;
export async function createOrder(orderObj) {
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/orders/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined,
        credentials: "include",
      },
      body: JSON.stringify(orderObj),
    });
    if (!res.ok) throw new Error("faild order please try again");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
