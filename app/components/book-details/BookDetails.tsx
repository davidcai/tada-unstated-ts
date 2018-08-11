import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Subscribe } from "unstated";
import { IBook, BookStore } from "../../store/book";

interface IProps extends Partial<IBook> {
  id: string;
  isLoading: boolean;
  error?: Error;
  loadWipBook: (id: string) => void;
}

export class BookDetails extends React.PureComponent<IProps> {
  componentDidMount() {
    const { id, loadWipBook } = this.props;
    loadWipBook(id);
  }

  render() {
    const { title, price } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <p>${price}</p>
      </div>
    );
  }
}

// TODO: externalize route props to somewhere
interface IBookRouteProps {
  id: string;
}

export const BookDetailsContainer: React.SFC<
  RouteComponentProps<IBookRouteProps>
> = ({ match }) => (
  <Subscribe to={[BookStore]}>
    {(bookStore: BookStore) => {
      const { wipBook, isLoading, error } = bookStore.state;

      return (
        <BookDetails
          {...wipBook}
          id={match.params.id}
          isLoading={isLoading}
          error={error}
          loadWipBook={bookStore.loadWipBook}
        />
      );
    }}
  </Subscribe>
);
