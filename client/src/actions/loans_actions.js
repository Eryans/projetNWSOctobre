import axios from "axios";
import { config } from "../config";

export async function getLoans() {
  return axios.get(`${config.baseURL}/api/loans/`).then((res) => res.data);
}
