/**
 * premade axios instance
 */
import Axios, { AxiosInstance } from "axios";

const baseURL: string = "https://jsonplaceholder.typicode.com/";

const request: AxiosInstance = Axios.create({
  baseURL,
});

export default request;
