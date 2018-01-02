import {
    ECashDocuments,
    TCashDocumentsAction,
} from 'client/types/actions';
import { ICashDocument } from 'client/types/state';
import { assertNever } from 'client/utils/assertNever';

export const cacheDocument = (
    state: ICashDocument = getDefaultTCompleteDocuments(),
    action: TCashDocumentsAction,
): ICashDocument => {
    let newState = state;

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
            assertNever(action);
        }
    }

    return newState;
};

export function getDefaultTCompleteDocuments(): ICashDocument {
    return {
    };
}
