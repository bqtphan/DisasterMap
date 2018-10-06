import React from 'react';
import Nav from "./components/Nav";
import Evacuationlists from "./pages/evacuationlists";
import Homelists from "./pages/homelists";
import { Row } from ".././src/components/Grid";


const App = () => (
  <div>
    <Nav />
    <Row>
      <Evacuationlists />
      <Homelists />
    </Row>

  </div>
);
export default App;