import { combineReducers, createStore } from 'redux';

import { documentList } from './DocumentList';
import { activeDocument } from './ActiveDocument';
import { IStore } from 'client/types/state';
import { cacheDocument } from './CashDocuments';

const
    win: any = window,
    reducers = combineReducers({
        activeDocument,
        documentList,
        cacheDocument,
    })
    ;

export const store = createStore(
    reducers,
    win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore;
