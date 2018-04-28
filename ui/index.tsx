import './styles/main.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/index';
import Home from './components/home';

const store = createStore(reducers);

ReactDOM.render((
    <Provider store={store}>
      <Home/>
    </Provider>
), document.getElementById('app'));

export default store;