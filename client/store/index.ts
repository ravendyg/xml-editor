import { combineReducers, createStore } from 'redux';

import { documentList } from './DocumentList';
import { IStore } from 'client/types/state';


const
    win: any = window,
    reducers = combineReducers({
        documentList,
    })
    ;

export const store = createStore(
    reducers,
    win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore;
