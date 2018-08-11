import axios from "axios";
import { ICategory } from "../store/category";

export function getAll(): Promise<ICategory[]> {
  return axios.get("http://localhost:3000/categories").then(res => res.data);
}

export function getById(id: string): Promise<ICategory> {
  return axios
    .get(`http://localhost:3000/categories/${id}`)
    .then(res => res.data);
}
