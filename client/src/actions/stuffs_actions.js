import axios from "axios";
import { config } from "../config";

export async function getStuffs() {
  return axios
    .get(`${config.serverBaseURL}/api/stuffs/`)
    .then((res) => res.data);
}
export async function getSpecificStuff(id) {
  return axios
    .get(`${config.serverBaseURL}/api/stuffs/${id}`)
    .then((res) => res.data);
}
export async function makeStuff(data) {
  return axios
    .post(`${config.serverBaseURL}/api/stuffs/add`, data)
    .then((res) => res.data);
}
export async function updateStuff(data) {
  return axios
    .patch(`${config.serverBaseURL}/api/stuffs/update`, data)
    .then((res) => res.data);
}
export async function deleteStuff(data) {
  return axios
    .delete(`${config.serverBaseURL}/api/stuffs/delete`, { data: data })
    .then((res) => res.data);
}
