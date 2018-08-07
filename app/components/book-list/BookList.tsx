import * as React from "react";
import { Subscribe } from "unstated";
import {
  BookStore,
  IBookStoreState,
  IBookStoreService
} from "../../store/book";

interface IProps extends IBookStoreState, IBookStoreService {}

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
          Object.keys(books).map(key => <li key={key}>{books[key].title}</li>)}
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
