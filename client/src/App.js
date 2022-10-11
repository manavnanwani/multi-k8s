import "./App.css";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>-- Fib Calculator --</h1>
          <Link to="/">Home</Link>
          <Link to="/otherpage">OtherPage</Link>
        </header>
        {/* <Routes>
          <Route exact path="/" component={Fib} />
          <Route exact path="/otherpage" component={OtherPage} />
        </Routes> */}
        <Fib />
      </div>
    </Router>
  );
}

export default App;
