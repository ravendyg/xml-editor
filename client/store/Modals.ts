import {
    EModalsActions,
    TModalsAction,
} from 'client/types/actions';
import { EModalTypes } from 'client/types/enums';
import { EModal } from 'client/types/state';
import { assertNever } from 'client/utils/assertNever';

export const modals = (
    state: EModal[] = getDefaultModals(),
    action: TModalsAction,
): EModal[] => {
    let newState = state;

    switch (action.type) {
        case EModalsActions.SHOW_NODE_CONTEXT_MENU: {
            newState = state.concat({
                payload: action.payload,
                type: EModalTypes.NODE_CONTEXT,
            });
            break;
        }
        case EModalsActions.HIDE_ALL_MODALS: {
            newState = [];
            break;
        }
        default: {
            assertNever(action);
        }
    }

    return newState;
};

export function getDefaultModals(): EModal[] {
    return [];
}
