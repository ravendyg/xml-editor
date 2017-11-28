import { IDocumentList } from 'client/types/state';
import { ELoadStatus } from 'client/types/enums';
import { EDocumentListAction, DocumentListAction } from 'client/types/actions';

export const documentList = (state: IDocumentList = getDefaultDocumentList(), action: DocumentListAction): IDocumentList => {
    let newState: IDocumentList;

    switch (action.type) {
        case EDocumentListAction.DOCUMENT_LIST_LOAD_START: {
            newState = {
                data: [],
                error: null,
                status: ELoadStatus.LOADING,
            };
            break;
        }
        case EDocumentListAction.DOCUMENT_LIST_LOAD_ERROR: {
            newState = {
                data: [],
                error: action.payload,
                status: ELoadStatus.ERROR,
            };
            break;
        }
        case EDocumentListAction.DOCUMENT_LIST_LOAD_SUCCESS: {
            newState = {
                data: action.payload,
                error: null,
                status: ELoadStatus.SUCCEESS,
            };
            break;
        }
        default: {
            return state;
        }
    }

    return newState;
}

export function getDefaultDocumentList(): IDocumentList {
    return {
        data: [],
        error: null,
        status: ELoadStatus.LOADING,
    };
}
