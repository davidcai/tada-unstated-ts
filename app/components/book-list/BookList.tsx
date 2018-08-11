import * as React from "react";
import { Subscribe } from "unstated";
import { BookStore, IBook } from "../../store/book";
import { BookListItem } from "./BookListItem";

interface IProps {
  books: IBook[];
  isLoading: boolean;
  error?: Error;
  loadBooks: () => void;
}

export class BookList extends React.PureComponent<IProps> {
  static defaultProps: Partial<IProps> = {
    books: [],
    isLoading: false
  };

  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    const { books, isLoading, error } = this.props;

    if (isLoading) {
      return <p>Please wait ...</p>;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <BookListItem {...book} />
          </li>
        ))}
      </ul>
    );
  }
}

export const BookListContainer: React.SFC = () => (
  <Subscribe to={[BookStore]}>
    {(bookStore: BookStore) => {
      const {
        booksById,
        categoriesById,
        authorsById,
        isLoading,
        error
      } = bookStore.state;

      // Denormalize books with categories and authors information
      const books: IBook[] = Object.keys(booksById).map(bookId => {
        const bookNormalized = booksById[bookId];
        return {
          id: bookNormalized.id,
          title: bookNormalized.title,
          price: bookNormalized.price,
          categories: bookNormalized.categories.map(id => categoriesById[id]),
          authors: bookNormalized.authors.map(id => authorsById[id])
        };
      });

      return (
        <BookList
          books={books}
          isLoading={isLoading}
          error={error}
          loadBooks={bookStore.loadBooks}
        />
      );
    }}
  </Subscribe>
);
