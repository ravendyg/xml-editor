import {
    EDragActions,
    TDragAction,
} from 'client/types/actions';
import { assertNever } from 'client/utils/assertNever';

export const drag = (
    state: string = '',
    action: TDragAction,
): string => {
    let newState = state;

    switch (action.type) {
        case EDragActions.START_DRAG: {
            newState = action.payload;
            break;
        }
        case EDragActions.STOP_DRAG: {
            newState = '';
            break;
        }
        default: {
            assertNever(action);
        }
    }

    return newState;
};
