import { combineReducers, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { rootSaga } from './sagas/rootSaga';
import createMiddleWareSaga from 'redux-saga';
import LoadingReducer from './reducers/LoadingReducer';
import UserLoginReducer from './reducers/UserLoginReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectReducer from './reducers/ProjectReducer';
import ProjectDetailReducer from './reducers/ProjectDetailReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    //states app
    LoadingReducer,
    UserLoginReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    ProjectDetailReducer,
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;