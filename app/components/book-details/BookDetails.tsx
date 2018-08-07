import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Subscribe } from "unstated";
import { BookStore, IBook, IBookStoreService } from "../../store/book";

interface IProps extends IBook, Partial<IBookStoreService> {}

export class BookDetails extends React.PureComponent<IProps> {
  render() {
    const { title, price } = this.props;

    return (
      <div>
        {title}: ${price}
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
      const book = bookStore.state.books[match.params.id];

      // authorStore.findAuthor(book.author);

      // TODO: fill in categories and authors

      return <BookDetails {...book} />;
    }}
  </Subscribe>
);
