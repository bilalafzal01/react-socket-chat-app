import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Join, Chat } from "./components";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{ name }, dispatch] = useStateValue();
  console.log(name);
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/direct" component={Chat} />
    </Router>
  );
};

export default App;
