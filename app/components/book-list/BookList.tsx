import * as React from "react";
import { Subscribe } from "unstated";
import {
  BookStore,
  IBookStoreState,
  IBookStoreService
} from "../../store/book";
import { BookListItem } from "./BookListItem";

interface IProps
  extends IBookStoreState,
    Pick<IBookStoreService, "loadBooks"> {}

export class BookList extends React.PureComponent<IProps> {
  static defaultProps: Partial<IProps> = {
    books: {}
  };

  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    const { books, isLoading } = this.props;

    if (isLoading) {
      return <p>Please wait ...</p>;
    }

    return (
      <ul>
        {books &&
          Object.keys(books).map(key => (
            <li key={key}>
              <BookListItem {...books[key]} />
            </li>
          ))}
      </ul>
    );
  }
}

export const BookListContainer: React.SFC = () => (
  <Subscribe to={[BookStore]}>
    {(bookStore: BookStore) => (
      <BookList {...bookStore.state} loadBooks={bookStore.loadBooks} />
    )}
  </Subscribe>
);
