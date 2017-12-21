import { createActionCreators } from 'client/actions/action-creators';
import {
    TCompleteDocument,
    TMoveInfo,
    TNodeInfo,
} from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IDocumentService } from 'client/types/services';
import { IStore } from 'client/types/state';

export interface IActions {
    loadDocumentList: () => Promise<void>;
    selectDocument: (docId: string) => Promise<void>;
    removeNode: (nodeId: string) => void;
    moveNode: (moveInfo: TMoveInfo) => void;
    updateNode: (nodeInfo: TNodeInfo) => void;
}

export const createActions = (store: IStore, documentService: IDocumentService): IActions => {
    const actionCreators = createActionCreators(store);

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
            return Promise.resolve();
        } else {
            actionCreators.startDocLoad();
            return documentService.getTCompleteDocument(docId)
            .then(doc => {
                actionCreators.confirmDocLoad(doc);
                actionCreators.addDocument(doc);
            })
            .catch(actionCreators.errorDocLoad);
        }
    };

    const loadDocumentList = () => {
        actionCreators.startListLoad();
        return documentService.getDocumentList()
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

    const removeNode = (nodeId: string) => {
        if (nodeId !== 'root') {
            actionCreators.removeNode(nodeId);
        }
    };

    const moveNode = (moveInfo: TMoveInfo) => {
        actionCreators.moveNode(moveInfo);
    };

    const updateNode = (nodeInfo: TNodeInfo) => {
        const { key } = nodeInfo;
        if (key !== 'root') {
            actionCreators.updateNode(nodeInfo);
        }
    };

    return {
        loadDocumentList,
        selectDocument,
        removeNode,
        moveNode,
        updateNode,
    };
};
