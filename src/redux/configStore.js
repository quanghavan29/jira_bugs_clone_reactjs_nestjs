import { combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    //states app

})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;