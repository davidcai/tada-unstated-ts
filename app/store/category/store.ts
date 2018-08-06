import axios from "axios";
import { Container } from "unstated";
import { ICategory } from "./types";

export interface ICategoryStoreState {
  categories: Record<string, ICategory>;
  isLoading: boolean;
  error?: Error;
}

export interface ICategoryStoreService {
  loadCategories: () => void;
}

export class CategoryStore extends Container<ICategoryStoreState>
  implements ICategoryStoreService {
  state = {
    categories: {},
    isLoading: false,
    error: undefined
  };

  loadCategories = async () => {
    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get("http://localhost:3000/categories");
      this.setState({
        categories: data,
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
