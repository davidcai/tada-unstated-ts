import { Container } from "unstated";
import { idify } from "../../utils";
import { ICategory } from "./category-types";
import { CategoryAPI } from "../../api";

export interface ICategoryStoreState {
  categoriesById: Record<string, ICategory>;
  isLoading: boolean;
  error?: Error;
}

export class CategoryStore extends Container<ICategoryStoreState> {
  state: ICategoryStoreState = {
    categoriesById: {},
    isLoading: false
  };

  loadCategories = async () => {
    this.setState({ isLoading: true });

    try {
      const categories = await CategoryAPI.getAll();
      this.setState({
        categoriesById: idify<ICategory>(categories),
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
