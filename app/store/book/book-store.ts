import axios from "axios";
import { Container } from "unstated";
import { idify } from "../../utils";
import { IBook } from "./book-types";

export interface IBookStoreState {
  books: Record<string, IBook>;
  currentBook?: IBook;
  isLoading: boolean;
  error?: Error;
}

export interface IBookStoreService {
  loadBooks: () => void;
  findBook: (id: string) => void;
}

export class BookStore extends Container<IBookStoreState>
  implements IBookStoreService {
  state: IBookStoreState = {
    books: {},
    isLoading: false
  };

  loadBooks = async () => {
    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get("http://localhost:3000/books");
      this.setState({
        books: idify<IBook>(data),
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

  findBook = async (id: string) => {
    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get(`http://localhost:3000/books/${id}`);
      this.setState({
        currentBook: data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error
      });
    }
  };
}
