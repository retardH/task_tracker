import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

const apiClient = axios.create();

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  axios.defaults.headers.common["Content-Type"] = "application/json";
  return config;
};

const onRequestErr = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

apiClient.interceptors.request.use(onRequest, onRequestErr);

const fetcher = async (method: "post" | "get", reqUrl: string, data: any) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const resp = await apiClient({
      method,
      url: reqUrl,
      data,
      headers,
    });
    return resp.data;
  } catch (err) {
    const error = err as AxiosError;
    if (!isAxiosError(error)) return;

    throw error.response?.data;
  }
};

export { fetcher, apiClient };
