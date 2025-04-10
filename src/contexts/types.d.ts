import { AxiosRequestConfig } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  method: Method;
  url: string;
}
