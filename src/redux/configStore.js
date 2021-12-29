import { combineReducers, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { rootSaga } from './sagas/rootSaga';
import createMiddleWareSaga from 'redux-saga';
import LoadingReducer from './reducers/LoadingReducer';
import UserLoginReducer from './reducers/UserLoginReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectReducer from './reducers/ProjectReducer';
import ProjectDetailReducer from './reducers/ProjectDetailReducer';
import UserReducer from './reducers/UserReducer';
import CreateTaskReducer from './reducers/CreateTaskReducer';
import ListMembersReducer from './reducers/ListMembersReducer';
import TaskReducer from './reducers/TaskReducer';
import ViewTaskReducer from './reducers/ViewTaskReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    //states app
    LoadingReducer,
    UserLoginReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    ProjectDetailReducer,
    UserReducer,
    CreateTaskReducer,
    ListMembersReducer,
    TaskReducer,
    ViewTaskReducer,
})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;