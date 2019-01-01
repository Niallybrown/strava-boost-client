import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import rootReducer, { RootState } from './reducers';

const middleware = process.env.REACT_APP_ENV === 'dev' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

const configureStore = () => {
  return createStore(
    rootReducer,
    process.env.REACT_APP_ENV === 'dev' ? compose(middleware) : composeWithDevTools(middleware),
  );
};

export const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

export default configureStore;
