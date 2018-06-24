import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import PostDetail from './components/PostDetail';
import Post from './components/Post';
import ViewCategory from './components/ViewCategory';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path='/newpost' component={Post} />
        <Route path='/edit/:id' component={Post} />
        <Route path='/:category' exact component={ViewCategory} />
        <Route path='/:category/:post_id' component={PostDetail} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));