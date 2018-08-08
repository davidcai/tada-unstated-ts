import axios from "axios";
import { IBookNormalized } from "../store/book";

export function getAll(): Promise<IBookNormalized[]> {
  return axios.get("http://localhost:3000/books").then(res => res.data);
}

export function getById(id: string): Promise<IBookNormalized> {
  return axios.get(`http://localhost:3000/books/${id}`).then(res => res.data);
}
