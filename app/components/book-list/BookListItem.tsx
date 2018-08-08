import * as React from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../store/book";

export const BookListItem: React.SFC<IBook> = ({ id, title, authors }) => (
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
