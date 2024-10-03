//const API_URL = "https://shopping-web-api.onrender.com";
//const API_URL = "http://127.0.0.1:3000";
// /api/users/login
// const jwtCookie = document.cookie
//   .split("; ")
//   .find((row) => row.startsWith("jwt="));

// const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;
//console.log(jwtToken);
//const jwtToken = localStorage.getItem("token");
//console.log("userprofile");
export async function signUp(signupObj) {
  try {
    const res = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupObj),
    });
    if (!res.ok) throw new Error("email already exist");
    //console.log(res);
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function login(loginObj) {
  try {
    const res = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });
    if (!res.ok) throw new Error("Failed loging try again");
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
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
export async function getCurrentUser() {
  const jwtToken = localStorage.getItem("token");
  const res = await fetch(`/api/users/userProfile`, {
    method: "GEt",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      credentials: "include",
    },
  });
  if (!res.ok) throw new Error("Failed getting user");

  const { data } = await res.json();
  //console.log(data.data);
  return data;
}
export async function getCurrentUserPhoto() {
  const jwtToken = localStorage.getItem("token");
  //console.log(jwtToken);
  const res = await fetch(`/api/users/getUserPhoto`, {
    method: "GEt",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      credentials: "include",
    },
  });
  //console.log(res);
  if (!res.ok) {
    if (res.status === 404) {
      // User photo not found, return null
      return null;
    } else {
      //   // Handle other errors
      throw new Error("Failed to fetch user photo");
    }
  }

  const data = await res.blob();
  //console.log(data);
  return data;
}

export async function deleteCurrentUserPhoto() {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`/api/users/deleteUserPhoto`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        credentials: "include",
      },
    });
    if (!res.ok) throw new Error("Failed to delete user photo");
    //const { data } = await res.json();
    //console.log("api", data);
    //return data;
  } catch (error) {
    throw new Error(error.message || "Failed to delete user photo");
  }
}
export async function uploadUserPhoto(photoFile) {
  const jwtToken = localStorage.getItem("token");
  try {
    const formData = new FormData();
    formData.append("userPhoto", photoFile);

    const res = await fetch(`/api/users/uploadUserPhoto`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        // Remove content type header to let browser set it automatically for FormData
        // "Content-Type": "multipart/form-data",
        credentials: "include",
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload photo");

    const { data } = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to upload photo");
  }
}
