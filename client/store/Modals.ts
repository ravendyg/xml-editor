import {
    EModalsActions,
    TModalsAction,
} from 'client/types/actions';
import { EModalTypes } from 'client/types/enums';
import { EModal } from 'client/types/state';

export const modals = (
    state: EModal[] = getDefaultModals(),
    action: TModalsAction,
): EModal[] => {
    let newState: EModal[];

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
            return state;
        }
    }

    return newState;
};

export function getDefaultModals(): EModal[] {
    return [];
}
