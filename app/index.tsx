import * as React from "react";
import * as ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.SFC = () => (
  <div>This is a test</div>
  // <ReduxProvider store={store}>
  //   <Router>
  //     <Switch>
  //       <Route exact={true} path="/" component={TaskListContainer} />
  //       {/* <Route path="/hello" component={HelloContainer} /> */}
  //     </Switch>
  //   </Router>
  // </ReduxProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
