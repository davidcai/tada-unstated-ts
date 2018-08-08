import axios from "axios";
import { IBook } from "../store/book";

export function getAll(): Promise<IBook[]> {
  return axios.get("http://localhost:3000/books").then(res => res.data);
}

export function getById(id: string): Promise<IBook> {
  return axios.get(`http://localhost:3000/books/${id}`).then(res => res.data);
}
