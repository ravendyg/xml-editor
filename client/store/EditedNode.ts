import {
    EDocumentActions,
    TDocumentAction,
} from 'client/types/actions';
import { assertNever } from 'client/utils/assertNever';

export const editedNode = (
    state: string = '',
    action: TDocumentAction,
): string => {
    let newState = state;

    switch (action.type) {
        case EDocumentActions.ADD_EMPTY_CHILD: {
            newState = 'empty';
            break;
        }
        case EDocumentActions.EDIT_EXISTING_NODE: {
            newState = action.payload;
            break;
        }
        case EDocumentActions.UPDATE_NODE:
        case EDocumentActions.STOP_EDITING: {
            newState = '';
            break;
        }
        case EDocumentActions.MOVE_NODE_BEFORE:
        case EDocumentActions.MOVE_NODE_TO_START:
        case EDocumentActions.REMOVE_NODE:
        case EDocumentActions.LOAD_START:
        case EDocumentActions.LOAD_SUCCESS:
        case EDocumentActions.LOAD_ERROR: {
            break;
        }
        default: {
            assertNever(action);
        }
    }

    return newState;
};
