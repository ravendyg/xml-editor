import {
    DocumentAction,
    EDocumentAction,
} from 'client/types/actions';
import {
    ELoadStatus,
    EMoveDirections,
} from 'client/types/enums';
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
        case EDocumentAction.ADD_EMPTY_CHILDREN: {
            const key = action.payload;
            if (state.data && state.data.model[key]) {
                const { attrs, children, parent, tagName } = state.data.model[key];
                const { id, model, name } = state.data;
                newState = {
                    data: {
                        id,
                        model: {
                            ...model,
                            [key]: {
                                attrs,
                                children: ['empty', ...children],
                                parent,
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
        case EDocumentAction.REMOVE_NODE: {
            // remove node itself and a ref from the parent
            const key = action.payload;
            if (state.data && state.data.model[key]) {
                const { id, model, name } = state.data;
                const { parent } = model[key];
                const parentNode = model[parent];
                let newParent = {
                    ...parentNode,
                    children: parentNode.children.filter(
                        el => el !== key
                    ),
                };
                let newModel = {
                    ...model,
                    [parent]: newParent,
                };
                delete newModel[key];
                newState = {
                    data: {
                        id,
                        model: newModel,
                        name,
                    },
                    error: null,
                    status: ELoadStatus.IDLE,
                };
            }
            break;
        }
        case EDocumentAction.MOVE_NODE: {
            const { direction, key } = action.payload;
            if (state.data && state.data.model[key]) {
                const { parent } = state.data.model[key];
                const { children, ...rest } = state.data.model[parent];
                const position = children.indexOf(key);
                let newChildren;
                // corner cases
                if (position === -1) {
                    throw new Error('Incorrect node key');
                } else if (position === 0 && direction === EMoveDirections.UP) {
                    newChildren = [...children.slice(1), key];
                } else if (position === children.length - 1 && direction === EMoveDirections.DOWN) {
                    newChildren = [key, ...children.slice(0, children.length - 1)];
                // general
                } else {
                    newChildren = children.slice(0);
                    let newIndex = position;
                    if (direction === EMoveDirections.UP) {
                        newIndex = position - 1;
                    } else if (direction === EMoveDirections.DOWN) {
                        newIndex = position + 1;
                    }
                    const tmp = newChildren[newIndex];
                    newChildren[newIndex] = newChildren[position];
                    newChildren[position] = tmp;
                }
                const { id, model, name } = state.data;
                newState = {
                    data: {
                        id,
                        model: {
                            ...model,
                            [parent]: {
                                children: newChildren,
                                ...rest,
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
        case EDocumentAction.UPDATE_NODE: {
            const { key, attrs, tagName } = action.payload;
            if (state.data && state.data.model[key]) {
                const { children, parent } = state.data.model[key];
                const { id, model, name } = state.data;
                newState = {
                    data: {
                        id,
                        model: {
                            ...model,
                            [key]: {
                                attrs,
                                children,
                                parent,
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
