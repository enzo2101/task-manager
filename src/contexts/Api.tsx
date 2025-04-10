import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import axios, { AxiosResponse } from "axios";
import { RequestConfig } from "./types";

interface ApiContextValues {
  request: <Type>(config: RequestConfig) => Promise<AxiosResponse<Type>>;
}

const ApiContext = createContext<ApiContextValues>({} as ApiContextValues);

const ApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const apiInstance = useMemo(
    () =>
      axios.create({
        baseURL: "https://api.npoint.io/",
      }),
    []
  );

  const request = useCallback(
    <Type,>(config: RequestConfig) => {
      if (config.params?.fields) {
        config.params.fields = config.params.fields.join(",");
      }

      return apiInstance.request<Type>(config);
    },
    [apiInstance]
  );

  return (
    <ApiContext.Provider
      value={{
        request,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  const context = useContext(ApiContext);
  return context;
};

export { ApiProvider, useApi };
