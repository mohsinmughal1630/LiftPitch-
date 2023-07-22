import {createStore, combineReducers, applyMiddleware} from 'redux';
import AppReducer from '../reducers/AppReducer';
import createSagaMiddleware from 'redux-saga';
import watcherSaga from '../saga/rootSaga';
const rootReducer = combineReducers({
  AppReducer: AppReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware];

const configureStore = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleWare),
);
sagaMiddleware.run(watcherSaga);
export type AppRootStore = ReturnType<typeof rootReducer>;
export default configureStore;
