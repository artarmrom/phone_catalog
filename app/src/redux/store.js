import { createStore } from "redux";
import rootReducer from "./reducers";
import { saveStore, loadStore } from './saveRedux'

const initialData = loadStore();
const store = createStore(rootReducer, initialData, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
    saveStore(store.getState());
});

export default store;