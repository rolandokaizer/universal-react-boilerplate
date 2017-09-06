import { createStore, combineReducers, applyMiddleware } from 'redux';

import exampleReducer from './example_reducer';

export default createStore( combineReducers({
    content: exampleReducer
}), {
    content: 'The initial state is set on the server in shared/src/reducers/store'
} );
