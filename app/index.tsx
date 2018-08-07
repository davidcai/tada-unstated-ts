import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "unstated";
import { TaskListContainer } from "./components/task-list";
import { BookListContainer } from "./components/book-list";

const App = () => (
  <Provider>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={TaskListContainer} />
        <Route path="/books" component={BookListContainer} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
