import axios from "axios";
import { IAuthor } from "../store/author";

export function getAll(): Promise<IAuthor[]> {
  return axios.get("http://localhost:3000/authors").then(res => res.data);
}

export function getById(id: string): Promise<IAuthor> {
  return axios.get(`http://localhost:3000/authors/${id}`).then(res => res.data);
}
