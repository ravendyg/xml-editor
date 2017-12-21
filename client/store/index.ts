import { combineReducers, createStore } from 'redux';

import { IStore } from 'client/types/state';
import { activeDocument } from './ActiveDocument';
import { cacheDocument } from './CashDocuments';
import { documentList } from './DocumentList';

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
