import axios from "axios";
import { useContext } from "react";
import { AppContext } from "./context";

interface Params {
  q: string;
  type: string;
}

const axiosGet = async (query: string, params?: Params) => {};

export default axiosGet;
