import {
    EDragActions,
    TDragAction,
} from 'client/types/actions';

export const drag = (
    state: string = '',
    action: TDragAction,
): string => {
    let newState: string;

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
            return state;
        }
    }

    return newState;
};
