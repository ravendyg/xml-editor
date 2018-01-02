import {TModel} from 'client/types/dataTypes';

/**
 * Check whether the node is not inside a target subtree
 *
 * @param {TModel} model
 * @param {string} nodeId
 * @param {string} treeRoot
 */
export const searchInSubtree = (model: TModel, nodeId: string, treeRoot: string): boolean => {
    if (!treeRoot) {
        return false;
    } else if (nodeId === treeRoot) {
        return true;
    } else {
        const children = model[treeRoot].children;
        const isInSubtree = children.reduce((acc, newRoot) => {
            return acc || searchInSubtree(model, nodeId, newRoot);
        }, false);
        return isInSubtree;
    }
};
