import { createActionCreators } from 'client/actions/action-creators';
import {
    TCompleteDocument,
    TMoveInfo,
    TNodeContextMenu,
    TNodeInfo,
} from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IDocumentService } from 'client/types/services';
import { IStore } from 'client/types/state';

export interface IActions {
    addEmptyChild: (nodeId: string) => void;
    editNode: (nodeId: string) => void;
    loadDocumentList: () => void;
    hideAllModals: () => void;
    moveNode: (moveInfo: TMoveInfo) => void;
    removeNode: (nodeId: string) => void;
    selectDocument: (docId: string) => void;
    updateNode: (nodeInfo: TNodeInfo) => void;
    showNodeContextMenu: (nodeContect: TNodeContextMenu) => void;
    stopEditNode: () => void;
}

export const createActions = (store: IStore, documentService: IDocumentService): IActions => {
    const actionCreators = createActionCreators(store);

    const addEmptyChild = actionCreators.addChild;

    const editNode = (nodeId: string) => {
        actionCreators.editNode(nodeId);
    };

    const loadDocumentList = () => {
        actionCreators.startListLoad();
        documentService.getDocumentList()
        .then(documents => {
            actionCreators.confirmListLoad(documents);
            // select first document by default
            const doc = store.getState().activeDocument;
            if (doc.data === null && doc.status === ELoadStatus.RUNNING) {
                actionCreators.confirmDocLoad(null);
            }
        })
        .catch(actionCreators.errorListLoad);
    };

    const hideAllModals = actionCreators.hideAllModals;

    const moveNode = (moveInfo: TMoveInfo) => {
        const { key } = moveInfo;
        if (key !== 'root') {
            actionCreators.moveNode(moveInfo);
        }
    };

    const removeNode = (nodeId: string) => {
        if (nodeId !== 'root') {
            actionCreators.removeNode(nodeId);
        }
    };

    const selectDocument = (docId: string) => {
        // cache currently selected doc, if any
        const { data, status } = store.getState().activeDocument;
        if (status === ELoadStatus.IDLE && data) {
            actionCreators.addDocument(data);
        }

        // load the selected one
        const cachedDoc: TCompleteDocument = store.getState().cacheDocument[docId];
        if (cachedDoc) {
            actionCreators.confirmDocLoad(cachedDoc);
            Promise.resolve();
        } else {
            actionCreators.startDocLoad();
            documentService.getTCompleteDocument(docId)
            .then(doc => {
                actionCreators.confirmDocLoad(doc);
                actionCreators.addDocument(doc);
            })
            .catch(actionCreators.errorDocLoad);
        }
    };

    const showNodeContextMenu = (nodeContext: TNodeContextMenu) => {
        actionCreators.showNodeContextMenu(nodeContext);
    };

    const stopEditNode = () => {
        actionCreators.stopNodeEditing();
    };

    const updateNode = (nodeInfo: TNodeInfo) => {
        const { key } = nodeInfo;
        if (key !== 'root') {
            actionCreators.updateNode(nodeInfo);
        }
    };

    return {
        addEmptyChild,
        editNode,
        loadDocumentList,
        hideAllModals,
        moveNode,
        removeNode,
        selectDocument,
        showNodeContextMenu,
        stopEditNode,
        updateNode,
    };
};
