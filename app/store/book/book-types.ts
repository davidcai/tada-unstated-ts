import { IAuthor } from "../author";
import { ICategory } from "../category";

export interface IBookNormalized {
  id: string;
  title: string;
  categories: string[];
  authors: string[];
  price: number;
}

export interface IBook {
  id: string;
  title: string;
  categories: ICategory[];
  authors: IAuthor[];
  price: number;
}
