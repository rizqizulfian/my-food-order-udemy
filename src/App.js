import { Fragment } from 'react';

import Header from './modules/Layout/Header';
import Meals from './modules/Meals/Meals';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
