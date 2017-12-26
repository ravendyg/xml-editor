import { combineReducers, createStore } from 'redux';

import { IStore } from 'client/types/state';
import { activeDocument } from './ActiveDocument';
import { cacheDocument } from './CashDocuments';
import { documentList } from './DocumentList';
import { editedNode } from './EditedNode';
import { modals } from './Modals';

const
    win: any = window,
    reducers = combineReducers({
        activeDocument,
        cacheDocument,
        documentList,
        editedNode,
        modals,
    })
    ;

export const store = createStore(
    reducers,
    win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore;
