import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
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
    this.props.loadWipBook(this.props.id);
  }

  render() {
    const { title, price, isLoading, error } = this.props;

    if (isLoading) {
      return <p>Please wait ...</p>;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <Formik
        initialValues={{
          title,
          price
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Please input title"),
          price: Yup.number()
            .required("Please input price")
            .positive("Price must be greater than 0")
        })}
        onSubmit={(
          _,
          { setSubmitting /*, setErrors setValues and other goodies */ }
        ) => {
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          // touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.title && <div>{errors.title}</div>}
            <div>
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.price && <div>{errors.price}</div>}
            <div>
              <button type="submit" disabled={isSubmitting}>
                Save
              </button>
            </div>
          </form>
        )}
      </Formik>
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
