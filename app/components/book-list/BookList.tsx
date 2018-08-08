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
    booksById: {},
    categoriesById: {},
    authorsById: {}
  };

  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    const {
      booksById,
      categoriesById,
      authorsById,
      isLoading,
      error
    } = this.props;

    if (isLoading) {
      return <p>Please wait ...</p>;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <ul>
        {Object.keys(booksById).map(bookId => {
          const book = booksById[bookId];
          const categories = book.categories.map(
            categoryId => categoriesById[categoryId]
          );
          const authors = book.authors.map(authorId => authorsById[authorId]);

          return (
            <li key={bookId}>
              <BookListItem
                {...book}
                categories={categories}
                authors={authors}
              />
            </li>
          );
        })}
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
