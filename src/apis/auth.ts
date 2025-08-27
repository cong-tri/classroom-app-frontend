import axios, { AxiosError } from "axios";
import { API } from "../config/axios-config";

const API_URL = "http://localhost:5000/api";

export const handleCreateAccessCode = async (phoneNumber: string) => {
  try {
    const response = await API.post(`${API_URL}/auth/createAccessCode`, {
      phoneNumber,
    });
    return {
      code: response.data.code,
      message: response.data.message,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.code,
        message: error.response?.data.message,
        success: false,
      };
    }
  }
};
//   axios.post(`${API_URL}/auth/createAccessCode`, { phoneNumber });

export const handleValidateAccessCode = async (
  phoneNumber: string,
  accessCode: string
) =>
  axios.post(`${API_URL}/auth/validateAccessCode`, { phoneNumber, accessCode });
