import { ICashDocument } from 'client/types/state';
import { ECashDocuments, CashDocumentsAction } from 'client/types/actions';

export const cashDocument = (
    state: ICashDocument = getDefaultCompleteDocuments(),
    action: CashDocumentsAction,
): ICashDocument => {
    let newState: ICashDocument;

    switch (action.type) {
        case ECashDocuments.ADD_DOCUMENT: {
            const newDoc = action.payload;
            newState = {
                ...state,
                [newDoc.id]: newDoc,
            };
            break;
        }
        case ECashDocuments.REMOVE_DOCUMENT: {
            newState = {
                ...state,
            };
            delete newState[action.payload];
            break;
        }
        default: {
            return state;
        }
    }

    return newState;
}

export function getDefaultCompleteDocuments(): ICashDocument {
    return {
    };
}
