import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_CLASSROOM_APP_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// intercepting requests
API.interceptors.request.use(
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // handle request here
    return request;
  },
  (error: AxiosError) => {
    // handle error here
    throw error;
  }
);

//intercepting responses
API.interceptors.response.use(
  (response) => {
    // handle response here
    return response;
  },
  (error: AxiosError) => {
    //handle error here
    throw error;
  }
);

export { API };
