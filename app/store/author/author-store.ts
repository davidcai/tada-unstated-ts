import axios from "axios";
import { Container } from "unstated";
import { idify } from "../../utils";
import { IAuthor } from "./author-types";

export interface IAuthorStoreState {
  authors: Record<string, IAuthor>;
  isLoading: boolean;
  error?: Error;
}

export interface IAuthorStoreService {
  loadAuthors: () => void;
  // findAuthor: (id: string) => void;
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
        authors: idify<IAuthor>(data),
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

  // findAuthor = async (id: string) => {
  //   this.setState({ isLoading: true });

  //   try {
  //     const { data } = await axios.get(`http://localhost:3000/authors/${id}`);
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
