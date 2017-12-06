import { combineReducers, createStore } from 'redux';

import { documentList } from './DocumentList';
import { activeDocument } from './ActiveDocument';
import { IStore } from 'client/types/state';
import { cashDocument } from './CashDocuments';

const
    win: any = window,
    reducers = combineReducers({
        activeDocument,
        documentList,
        cashDocument,
    })
    ;

export const store = createStore(
    reducers,
    win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore;
