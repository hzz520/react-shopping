/**
 * The Project Entry
 *
 * @author  黄忠贞
 *          Darcy.X
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import route from './Router/Route';
import store from './Redux/Store/Store';

/*
 |--------------------------------------------------------------------------
 | public stylesheet
 |--------------------------------------------------------------------------
 |
 */
import '../libs/scss/normalize.scss';
import '../libs/scss/public.scss'

const mainWrap = document.createElement('div');
mainWrap.setAttribute('id', 'root');
document.body.appendChild(mainWrap);

/*
 |--------------------------------------------------------------------------
 | Redux Store listen
 |--------------------------------------------------------------------------
 */
store.subscribe(() => { //监听state变化
    // console.log(store.getState())
});

/*
 |--------------------------------------------------------------------------
 | ReactDOM Render
 |--------------------------------------------------------------------------
 | ReactDOM render for document
 |
 */
ReactDOM.render((
    <Provider store={store}>
        { route }
    </Provider>
), document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));