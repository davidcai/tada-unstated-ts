import { Container } from "unstated";
import { AuthorAPI, BookAPI, CategoryAPI } from "../../api";
import { idify, pick } from "../../utils";
import { IAuthor } from "../author";
import { ICategory } from "../category";
import { IBookNormalized, IBook } from "./book-types";

export interface IBookStoreState {
  booksById: Record<string, IBookNormalized>;
  categoriesById: Record<string, ICategory>;
  authorsById: Record<string, IAuthor>;
  wipBook?: IBook;
  isLoading: boolean;
  error?: Error;
}

export class BookStore extends Container<IBookStoreState> {
  state: IBookStoreState = {
    booksById: {},
    categoriesById: {},
    authorsById: {},
    isLoading: false
  };

  loadBooks = async () => {
    this.setState({ isLoading: true });

    try {
      const [books, categories, authors] = await Promise.all([
        BookAPI.getAll(),
        CategoryAPI.getAll(),
        AuthorAPI.getAll()
      ]);

      // Normalize books, categories, and authors
      const booksById = idify(books);
      const categoriesById = idify(categories);
      const authorsById = idify(authors);

      this.setState({
        booksById,
        categoriesById,
        authorsById,
        isLoading: false,
        error: undefined
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: new Error("Cannot load books")
      });
    }
  };

  loadWipBook = async (id: string) => {
    this.setState({ isLoading: true });

    try {
      const bookNormalized = await BookAPI.getById(id);
      const book = pick(bookNormalized, ["id", "title", "price"]) as IBook;
      book.categories = await Promise.all(
        bookNormalized.categories.map(categoryId =>
          CategoryAPI.getById(categoryId)
        )
      );
      book.authors = await Promise.all(
        bookNormalized.authors.map(authorId => AuthorAPI.getById(authorId))
      );

      this.setState({
        wipBook: book,
        isLoading: false,
        error: undefined
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error
      });
    }
  };
}
