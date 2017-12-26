import {
    EDocumentListActions,
    TDocumentListAction,
} from 'client/types/actions';
import { ELoadStatus } from 'client/types/enums';
import { IDocumentList } from 'client/types/state';

export const documentList = (
    state: IDocumentList = getDefaultDocumentList(),
    action: TDocumentListAction,
): IDocumentList => {
    let newState: IDocumentList;

    switch (action.type) {
        case EDocumentListActions.LOAD_START: {
            newState = {
                data: [],
                error: null,
                status: ELoadStatus.RUNNING,
            };
            break;
        }
        case EDocumentListActions.LOAD_ERROR: {
            newState = {
                data: [],
                error: action.payload,
                status: ELoadStatus.ERROR,
            };
            break;
        }
        case EDocumentListActions.LOAD_SUCCESS: {
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
};

export function getDefaultDocumentList(): IDocumentList {
    return {
        data: [],
        error: null,
        status: ELoadStatus.IDLE,
    };
}
