import axios from "axios";
import { config } from "../config";

export async function getLoans() {
  return axios
    .get(`${config.serverBaseURL}/api/loans/`)
    .then((res) => res.data);
}
export async function getSpecificLoan(id) {
  return axios
    .get(`${config.serverBaseURL}/api/loans/${id}`)
    .then((res) => res.data);
}
export async function makeLoan(data) {
  return axios
    .post(`${config.serverBaseURL}/api/loans/add`, data)
    .then((res) => res.data);
}
export async function updateLoan(data) {
  return axios
    .patch(`${config.serverBaseURL}/api/loans/update`, data)
    .then((res) => res.data);
}
export async function deleteLoan(data) {
  return axios
    .delete(`${config.serverBaseURL}/api/loans/delete`, { data: data })
    .then((res) => res.data);
}
