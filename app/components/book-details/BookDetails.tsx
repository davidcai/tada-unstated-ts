import * as React from "react";
import { IBook } from "../../store/book";

export const BookDetails: React.SFC<IBook> = ({ title, price }) => (
  <div>
    <h2>{title}</h2>
    <p>{price}</p>
  </div>
);

// import { RouteComponentProps } from "react-router";
// import { Subscribe } from "unstated";
// import { BookStore, IBook, IBookStoreService } from "../../store/book";

// interface IProps extends IBook, Pick<IBookStoreService, "loadCurrentBook"> {}

// export class BookDetails extends React.PureComponent<IProps> {
//   componentDidMount() {
//     this.props.loadCurrentBook();
//   }

//   render() {
//     const { title, price } = this.props;

//     return (
//       <div>
//         {title}: ${price}
//       </div>
//     );
//   }
// }

// // TODO: externalize route props to somewhere
// interface IBookRouteProps {
//   id: string;
// }

// export const BookDetailsContainer: React.SFC<
//   RouteComponentProps<IBookRouteProps>
// > = ({ match }) => (
//   <Subscribe to={[BookStore]}>
//     {(bookStore: BookStore) => {
//       bookStore.loadCurrentBook(match.params.id);
//       return <BookDetails id={match.params.id} {...bookStore.state} />;
//     }}
//   </Subscribe>
// );
