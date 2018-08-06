import axios from "axios";
import { Container } from "unstated";
import { IBook } from "./types";

export interface IBookStoreState {
  books: Record<string, IBook>;
  isLoading: boolean;
  error?: Error;
}

export interface IBookStoreService {
  loadBooks: () => void;
}

export class BookStore extends Container<IBookStoreState>
  implements IBookStoreService {
  state = {
    books: {},
    isLoading: false,
    error: undefined
  };

  loadBooks = async () => {
    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get("http://localhost:3000/books");
      this.setState({
        books: data,
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
