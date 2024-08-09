import axios from "axios";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error message: ", error.message);
      throw Error(error.response?.data.message);
    } else {
      console.log("Unexpected error: ", error);
    }
    throw error;
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(response?.data.message);
  }

  return response.data;
};

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/validate-token`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("validateToken Erros:", error.response);
    }
    throw new Error("Token Invalid");
  }
};
