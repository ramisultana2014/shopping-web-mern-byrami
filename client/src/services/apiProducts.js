//const API_URL = "https://shopping-web-api.onrender.com";
//const API_URL = "http://127.0.0.1:3000";
// const jwtToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTI1OTljOWZiNjZmMTlkNjgzM2VkNCIsImlhdCI6MTcxMjczMTA4MH0.hB4dGKJXfbWY6W8t23kaoIRnTuJN2pgGG6K2qAmHQVc";
// const jwtCookie = document.cookie
//   .split("; ")
//   .find((row) => row.startsWith("jwt="));

// const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;
//console.log(document.cookie);
//console.log(jwtToken);

//console.log("first");
export async function getAllProducts({ filter, sortBy }) {
  //console.log(jwt);
  //console.log(filter);
  //console.log("inside", jwtToken);
  const jwtToken = localStorage.getItem("token");
  let query = "?";
  if (filter) {
    query = `${query}${filter.field}=${filter.value}`;
  }
  if (sortBy && !filter) {
    query = `${query}${sortBy.field}=${sortBy.value}`;
  }
  if (sortBy && filter) {
    query = `${query}&${sortBy.field}=${sortBy.value}`;
  }
  //console.log(query);
  const res = await fetch(`/api/products${query}`, {
    method: "GET",
    headers: {
      //  Authorization: `Bearer ${jwtToken}`,
      Authorization: `Bearer ${jwtToken}`,
      credentials: "include",
    },
  });

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw new Error("Failed getting products");

  const { data } = await res.json();
  //console.log("data", data.products);
  return data.products;
}
export async function createProduct(productObj) {
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        credentials: "include",
      },
      body: JSON.stringify(productObj),
    });
    if (!res.ok) throw new Error("product already exist");
    //console.log(res);
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function updateProduct({ dataObj, id }) {
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        credentials: "include",
      },
      body: JSON.stringify(dataObj),
    });
    if (!res.ok) throw new Error();
    //console.log(res);
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function deleteProduct(id) {
  const jwtToken = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        credentials: "include",
      },
    });
    if (!res.ok) throw new Error();
    //console.log(res);

    //console.log("api", data);
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
