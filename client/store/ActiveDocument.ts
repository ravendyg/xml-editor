import {
    EDocumentActions,
    TDocumentAction,
} from 'client/types/actions';
import {
    ELoadStatus,
    EMoveDirections,
} from 'client/types/enums';
import { IActiveDocument } from 'client/types/state';

export const activeDocument = (
    state: IActiveDocument = getDefaultDocumentList(),
    action: TDocumentAction,
): IActiveDocument => {
    let newState: IActiveDocument = state;

    switch (action.type) {
        case EDocumentActions.LOAD_START: {
            newState = {
                data: null,
                error: null,
                status: ELoadStatus.RUNNING,
            };
            break;
        }
        case EDocumentActions.LOAD_ERROR: {
            newState = {
                data: null,
                error: action.payload,
                status: ELoadStatus.ERROR,
            };
            break;
        }
        case EDocumentActions.LOAD_SUCCESS: {
            newState = {
                data: action.payload,
                error: null,
                status: ELoadStatus.IDLE,
            };
            break;
        }
        case EDocumentActions.ADD_EMPTY_CHILD: {
            const key = action.payload;
            const data = state.data;
            if (data && data.model[key]) {
                const { attrs, children, parent, tagName } = data.model[key];
                const { id, model, name } = data;
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
                            'empty': {
                                attrs: [],
                                children: [],
                                parent: key,
                                tagName: '',
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
        case EDocumentActions.REMOVE_NODE: {
            // remove node itself and a ref from the parent
            const key = action.payload;
            const data = state.data;
            if (data && data.model[key]) {
                const { id, model, name } = data;
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
        case EDocumentActions.MOVE_NODE: {
            const { direction, key } = action.payload;
            const data = state.data;
            if (data && data.model[key]) {
                const { parent } = data.model[key];
                const { children, ...rest } = data.model[parent];
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
                const { id, model, name } = data;
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
        case EDocumentActions.UPDATE_NODE: {
            const { key, attrs, tagName, parent } = action.payload;
            const { data } = state;
            if (!data) {
                // not sure how we came here
                break;
            }
            const realKey = data.model.empty ? 'empty' : key;
            if (data.model[realKey]) {
                const { id, model, name } = data;
                const { children } = model[realKey];
                const newModel = {
                    ...model,
                    [key]: {
                        attrs,
                        children,
                        parent,
                        tagName,
                    },
                };
                // if updating an empty node - modify parent, remove empty
                if (realKey === 'empty') {
                    const parentObj = newModel[parent];
                    if (parentObj.children.find(item => item === 'empty')) {
                        newModel[parent] = {
                            ...parentObj,
                            children: parentObj.children.map(item => item !== 'empty' ? item : key),
                        };
                    }
                    delete newModel.empty;
                }
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
