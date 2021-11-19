import { Fragment } from 'react';

import Header from './modules/Layout/Header';
import Meals from './modules/Meals/Meals';
import Cart from './modules/Cart/Cart';

function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
