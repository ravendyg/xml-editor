import { IActiveDocument } from 'client/types/state';
import { ELoadStatus } from 'client/types/enums';
import { EActiveDocumentAction, ActiveDocumentAction } from 'client/types/actions';

export const activeDocument = (state: IActiveDocument = getDefaultDocumentList(), action: ActiveDocumentAction): IActiveDocument => {
    let newState: IActiveDocument;

    switch (action.type) {
        case EActiveDocumentAction.LOAD_START: {
            newState = {
                data: null,
                error: null,
                status: ELoadStatus.RUNNING,
            };
            break;
        }
        case EActiveDocumentAction.LOAD_ERROR: {
            newState = {
                data: null,
                error: action.payload,
                status: ELoadStatus.ERROR,
            };
            break;
        }
        case EActiveDocumentAction.LOAD_SUCCESS: {
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
