import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './App';

//Using reduxThunk for the dispatch functionality and async actions.
const store = createStore(reducers,applyMiddleware(reduxThunk))

ReactDOM.render(
<Provider store={store}>
  <App/>
</Provider>,document.getElementById('root'));


