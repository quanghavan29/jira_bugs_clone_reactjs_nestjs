import { combineReducers, createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import {rootSaga} from './sagas/rootSaga';
import createMiddleWareSaga from 'redux-saga';
import LoadingReducer from './reducers/LoadingReducer';
import UserLoginReducer from './reducers/UserLoginReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    //states app
    LoadingReducer,
    UserLoginReducer,
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;