import {
    EDocumentActions,
    TDocumentAction,
} from 'client/types/actions';
import {
    ELoadStatus,
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
        case EDocumentActions.REMOVE_NODE_TO_END: {
            // remove node itself and a ref from the parent
            const key = action.payload;
            const data = state.data;
            if (data && data.model[key]) {
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
            if (!data) {
                // not sure how we came here
                break;
            }

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
            if (oldParentId !== target) {
                newModel[target] = {
                    ...model[target],
                    children: model[target].children.concat(key),
                };
            } else {
                newModel[target].children.push(key);
            }

            newState = {
                ...state,
                data: {
                    ...data,
                    model: newModel,
                },
            };
            break;
        }
        case EDocumentActions.MOVE_NODE_TO_END_BEFORE: {
            const { key, target } = action.payload;
            // - replace the old parent
            // - remove from the old parent children list
            // - add to the new parent list before the target
            console.log(`Move ${key} before ${target}`);
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
