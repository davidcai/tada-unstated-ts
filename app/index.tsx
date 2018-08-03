import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "unstated";
import { TaskListContainer } from "./components/task-list";

const App = () => (
  <Provider>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={TaskListContainer} />
        {/* <Route path="/hello" component={HelloContainer} /> */}
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
