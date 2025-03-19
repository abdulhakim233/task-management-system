import API from "./api";

// Define the response type
interface AuthResponse {
  [x: string]: any;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await API.post<AuthResponse>("/register", userData);
  console.log(response.data);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await API.post<AuthResponse>("/login", credentials);
    console.log(response.data);
    localStorage.setItem("token", response.data.token); // ✅ No more TypeScript error
    API.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  await API.post("/logout");
  localStorage.removeItem("token");
  delete API.defaults.headers.common["Authorization"];
};
