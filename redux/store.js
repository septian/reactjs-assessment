import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducerCart from "./reducerCart";

export const initializeStore = () => {
    const middlewares = applyMiddleware(reduxLogger);
    const rootReducer = combineReducers({reducerCart});
    return createStore(rootReducer, composeWithDevTools(middlewares));
}