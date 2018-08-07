import * as React from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../store/book";

export const BookListItem: React.SFC<IBook> = ({ id, title }) => (
  <Link to={`/books/${id}`}>{title}</Link>
);
