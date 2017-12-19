import {
    ECashDocuments,
    EDocumentAction,
    EDocumentListAction,
} from 'client/types/actions';
import { TCompleteDocument, TNodeInfo } from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IDocumentService } from 'client/types/services';
import { IStore } from 'client/types/state';

export interface IActions {
    loadDocumentList: () => Promise<void>;
    selectDocument: (docId: string) => Promise<void>;
    updateNode: (nodeInfo: TNodeInfo) => void;
}

export const createActions = (store: IStore, documentService: IDocumentService): IActions => {
    const selectDocument = (docId: string) => {
        // cash currently selected doc, if any
        const { data, status } = store.getState().activeDocument;
        if (status === ELoadStatus.IDLE && data) {
            store.dispatch({
                type: ECashDocuments.ADD_DOCUMENT,
                payload: data,
            });
        }

        // load the selected one
        const cashedDoc: TCompleteDocument = store.getState().cashDocument[docId];
        if (cashedDoc) {
            store.dispatch({
                type: EDocumentAction.LOAD_SUCCESS,
                payload: cashedDoc,
            });
            return Promise.resolve();
        } else {
            store.dispatch({
                type: EDocumentAction.LOAD_START,
                payload: null,
            });
            return documentService.getTCompleteDocument(docId)
            .then(doc => {
                store.dispatch({
                    type: EDocumentAction.LOAD_SUCCESS,
                    payload: doc,
                });
                store.dispatch({
                    type: ECashDocuments.ADD_DOCUMENT,
                    payload: doc,
                });
            })
            .catch(error => {
                store.dispatch({
                    type: EDocumentAction.LOAD_ERROR,
                    payload: error,
                });
            });
        }
    };

    const loadDocumentList = () => {
        store.dispatch({
            type: EDocumentListAction.LOAD_START,
            payload: null,
        });
        return documentService.getDocumentList()
        .then(documents => {
            store.dispatch({
                type: EDocumentListAction.LOAD_SUCCESS,
                payload: documents,
            });
            // select first document by default
            const doc = store.getState().activeDocument;
            if (doc.data === null && doc.status === ELoadStatus.RUNNING) {
                store.dispatch({
                    type: EDocumentAction.LOAD_SUCCESS,
                    payload: null,
                });
            }
        })
        .catch(error => {
            store.dispatch({
                type: EDocumentListAction.LOAD_ERROR,
                payload: error,
            });
        });
    };

    const updateNode = (payload: TNodeInfo) => {
        const { key } = payload;
        if (key !== 'root') {
            store.dispatch({
                type: EDocumentAction.UPDATE_NODE,
                payload,
            });
        }
    };

    return {
        loadDocumentList,
        selectDocument,
        updateNode,
    };
};
