import axios from "axios";
import { config } from "../config";

export async function getStudents() {
  return axios
    .get(`${config.serverBaseURL}/api/students/`)
    .then((res) => res.data);
}
export async function getSpecificStudent(id) {
  return axios
    .get(`${config.serverBaseURL}/api/students/${id}`)
    .then((res) => res.data);
}
export async function makeStudent(data) {
  return axios
    .post(`${config.serverBaseURL}/api/students/add`, data)
    .then((res) => res.data);
}
export async function updateStudent(data) {
  return axios
    .patch(`${config.serverBaseURL}/api/students/update`, data)
    .then((res) => res.data);
}
export async function deleteStudent(data) {
  return axios
    .delete(`${config.serverBaseURL}/api/students/delete`, { data: data })
    .then((res) => res.data);
}
