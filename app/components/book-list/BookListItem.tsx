import * as React from "react";
import { Link } from "react-router-dom";
import { IAuthor } from "../../store/author";
import { IBook } from "../../store/book";
import { ICategory } from "../../store/category";

interface IProps
  extends Pick<IBook, Exclude<keyof IBook, "categories" | "authors">> {
  categories: ICategory[];
  authors: IAuthor[];
}

export const BookListItem: React.SFC<IProps> = ({ id, title, authors }) => (
  <div>
    <Link to={`/books/${id}`}>{title}</Link>
    {" by "}
    {authors.map((author, index) => (
      <span key={author.id}>
        {index > 0 ? "; " : ""}
        {author.name}
      </span>
    ))}
  </div>
);
