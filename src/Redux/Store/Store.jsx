/**
 * Store
 *
 * @author  Darcy.X <darcyonw@163.com>
 */
import {createStore, applyMiddleware} from 'redux';
import reducer from '../Reducer/IndexReducer';
import thunk from 'redux-thunk';



/**
 * 创建一个 Redux store 来以存放应用中所有的 state，
 * 应用中应有且仅有一个 store。
 */

var store = createStore(
    reducer,
    applyMiddleware(thunk)
);







export default store;