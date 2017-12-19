import {
    DocumentAction,
    EDocumentAction,
} from 'client/types/actions';
import { ELoadStatus } from 'client/types/enums';
import { IActiveDocument } from 'client/types/state';

export const activeDocument = (
    state: IActiveDocument = getDefaultDocumentList(),
    action: DocumentAction,
): IActiveDocument => {
    let newState: IActiveDocument = state;

    switch (action.type) {
        case EDocumentAction.LOAD_START: {
            newState = {
                data: null,
                error: null,
                status: ELoadStatus.RUNNING,
            };
            break;
        }
        case EDocumentAction.LOAD_ERROR: {
            newState = {
                data: null,
                error: action.payload,
                status: ELoadStatus.ERROR,
            };
            break;
        }
        case EDocumentAction.LOAD_SUCCESS: {
            newState = {
                data: action.payload,
                error: null,
                status: ELoadStatus.IDLE,
            };
            break;
        }
        case EDocumentAction.UPDATE_NODE: {
            const { key, attrs, tagName } = action.payload;
            if (state.data && state.data.model[key]) {
                const { children } = state.data.model[key];
                const { id, model, name } = state.data;
                newState = {
                    data: {
                        id,
                        model: {
                            ...model,
                            [key]: {
                                attrs,
                                children,
                                tagName,
                            },
                        },
                        name,
                    },
                    error: null,
                    status: ELoadStatus.IDLE,
                };
            }
            break;
        }
    }

    return newState;
};

export function getDefaultDocumentList(): IActiveDocument {
    return {
        data: null,
        error: null,
        status: ELoadStatus.RUNNING,
    };
}
