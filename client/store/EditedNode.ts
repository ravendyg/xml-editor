import {
    EDocumentActions,
    TDocumentAction,
} from 'client/types/actions';

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
        default: {
            return state;
        }
    }

    return newState;
};
