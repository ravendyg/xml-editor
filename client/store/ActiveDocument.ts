import { IActiveDocument } from 'client/types/state';
import { ELoadStatus } from 'client/types/enums';
import { ELoadDocumentAction, LoadDocumentAction } from 'client/types/actions';

export const activeDocument = (
    state: IActiveDocument = getDefaultDocumentList(),
    action: LoadDocumentAction,
): IActiveDocument => {
    let newState: IActiveDocument;

    switch (action.type) {
        case ELoadDocumentAction.LOAD_START: {
            newState = {
                data: null,
                error: null,
                status: ELoadStatus.RUNNING,
            };
            break;
        }
        case ELoadDocumentAction.LOAD_ERROR: {
            newState = {
                data: null,
                error: action.payload,
                status: ELoadStatus.ERROR,
            };
            break;
        }
        case ELoadDocumentAction.LOAD_SUCCESS: {
            newState = {
                data: action.payload,
                error: null,
                status: ELoadStatus.IDLE,
            };
            break;
        }
        default: {
            return state;
        }
    }

    return newState;
}

export function getDefaultDocumentList(): IActiveDocument {
    return {
        data: null,
        error: null,
        status: ELoadStatus.IDLE,
    };
}
