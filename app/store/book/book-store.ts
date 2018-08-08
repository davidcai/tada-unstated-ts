import { Container } from "unstated";
import { AuthorAPI, BookAPI, CategoryAPI } from "../../api";
import { idify } from "../../utils";
import { IAuthor } from "../author";
import { IBook } from "./book-types";
import { ICategory } from "../category";

export interface IBookStoreState {
  booksById: Record<string, IBook>;
  categoriesById: Record<string, ICategory>;
  authorsById: Record<string, IAuthor>;
  currentBook?: IBook;
  isLoading: boolean;
  error?: Error;
}

export interface IBookStoreService {
  loadBooks: () => void;
  // loadCurrentBook: (id: string) => void;
}

export class BookStore extends Container<IBookStoreState>
  implements IBookStoreService {
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

  // loadCurrentBook = async (id: string) => {
  //   const book = await BookAPI.getById(id);
  //   const categories = await Promise.all(
  //     book.categories.map(categoryId => CategoryAPI.getById(categoryId))
  //   );
  //   const authors = await Promise.all(
  //     book.authors.map(authorId => AuthorAPI.getById(authorId))
  //   );

  //   console.log(book, categories, authors);

  //   // TODO: load authors and categories
  // };

  // findBook = async (id: string) => {
  //   this.setState({ isLoading: true });

  //   try {
  //     const { data } = await axios.get(`http://localhost:3000/books/${id}`);
  //     this.setState({
  //       currentBook: data,
  //       isLoading: false
  //     });
  //   } catch (error) {
  //     this.setState({
  //       isLoading: false,
  //       error
  //     });
  //   }
  // };
}
