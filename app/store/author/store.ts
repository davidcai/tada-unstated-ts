import axios from "axios";
import { Container } from "unstated";
import { IAuthor } from "./types";

export interface IAuthorStoreState {
  authors: Record<string, IAuthor>;
  isLoading: boolean;
  error?: Error;
}

export interface IAuthorStoreService {
  loadAuthors: () => void;
}

export class AuthorStore extends Container<IAuthorStoreState> {
  state = {
    authors: {},
    isLoading: false,
    error: undefined
  };

  loadAuthors = async () => {
    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get("http://localhost:3000/authors");
      this.setState({
        authors: data,
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
