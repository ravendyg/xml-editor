import {
    EDocumentActions,
    TDocumentAction,
} from 'client/types/actions';
import { ELoadStatus } from 'client/types/enums';
import { IActiveDocument } from 'client/types/state';
import { assertNever } from 'client/utils/assertNever';

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
                const { model } = data;
                const { attrs, children, parent, tagName } = model[key];
                newState = {
                    ...state,
                    data: {
                        ...data,
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
                    },
                };
            }
            break;
        }
        case EDocumentActions.REMOVE_NODE: {
            // remove node itself and a ref from the parent
            const key = action.payload;
            const { data } = state;
            if (!data) { break; }

            if (data.model[key]) {
                const { model } = data;
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
                    ...state,
                    data: {
                        ...data,
                        model: newModel,
                    },
                };
            }
            break;
        }
        case EDocumentActions.MOVE_NODE_TO_END: {
            const { key, target } = action.payload;
            const { data } = state;
            if (!data) { break; }

            const { model } = data;

            const updatedElement = {
                ...model[key],
                parent: target,
            };

            const oldParentId = model[key].parent;
            const oldParent = {
                ...model[oldParentId],
                children: model[oldParentId].children.filter(e => e !== key),
            };

            let newModel = {
                ...model,
                [oldParentId]: oldParent,
                [key]: updatedElement,
            };

            // move inside one parent is an edge case
            newModel[target] = {
                ...newModel[target],
                children: newModel[target].children.concat(key),
            };

            newState = {
                ...state,
                data: {
                    ...data,
                    model: newModel,
                },
            };
            break;
        }
        // TODO: maybe remove repetitive code?
        case EDocumentActions.MOVE_NODE_BEFORE: {
            const { key, target } = action.payload;
            const { data } = state;
            if (!data) { break; }

            const { model } = data;
            const newParentId = model[target].parent;

            const updatedElement = {
                ...model[key],
                parent: newParentId,
            };

            const oldParentId = model[key].parent;
            const oldParent = {
                ...model[oldParentId],
                children: model[oldParentId].children.filter(e => e !== key),
            };

            let newModel = {
                ...model,
                [oldParentId]: oldParent,
                [key]: updatedElement,
            };

            const newSiblings = newModel[newParentId].children;
            const targetPosition = newSiblings.indexOf(target);
            const newChildren = [
                ...newSiblings.slice(0, targetPosition),
                key,
                ...newSiblings.slice(targetPosition),
            ];
            newModel[newParentId] = {
                ...newModel[newParentId],
                children: newChildren,
            };

            newState = {
                ...state,
                data: {
                    ...data,
                    model: newModel,
                },
            };
            break;
        }
        case EDocumentActions.UPDATE_NODE: {
            const { key, attrs, tagName, parent } = action.payload;
            const { data } = state;
            if (!data) { break; }

            const realKey = data.model.empty ? 'empty' : key;
            if (data.model[realKey]) {
                const { model } = data;
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
                    ...state,
                    data: {
                        ...data,
                        model: newModel,
                    },
                };
            }
            break;
        }
        case EDocumentActions.EDIT_EXISTING_NODE:
        case EDocumentActions.STOP_EDITING: {
            // because use the same set of actions for different reducers
            // will it go away with introducing editing mode?
            break;
        }
        default: {
            assertNever(action);
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
