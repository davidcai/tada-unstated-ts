import { Container } from "unstated";
import { idify } from "../../utils";
import { AuthorAPI } from "../../api";
import { IAuthor } from "./author-types";

export interface IAuthorStoreState {
  authorsById: Record<string, IAuthor>;
  isLoading: boolean;
  error?: Error;
}

export class AuthorStore extends Container<IAuthorStoreState> {
  state: IAuthorStoreState = {
    authorsById: {},
    isLoading: false
  };

  loadAuthors = async () => {
    this.setState({ isLoading: true });

    try {
      const authors = await AuthorAPI.getAll();
      this.setState({
        authorsById: idify<IAuthor>(authors),
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
