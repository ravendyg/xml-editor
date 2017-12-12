import {
    ECashDocuments,
    EDocumentListAction,
    ELoadDocumentAction,
} from 'client/types/actions';
import { TCompleteDocument } from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IDocumentService } from 'client/types/services';
import { IStore } from 'client/types/state';

export interface IActions {
    loadDocumentList: () => Promise<void>;
    selectDocument: (docId: string) => Promise<void>;
}

export const createActions = (store: IStore, documentService: IDocumentService): IActions => {
    const selectDocument = (docId: string) => {
        const cashedDoc: TCompleteDocument = store.getState().cashDocument[docId];
        if (cashedDoc) {
            store.dispatch({
                type: ELoadDocumentAction.LOAD_SUCCESS,
                payload: cashedDoc,
            });
            return Promise.resolve();
        } else {
            store.dispatch({
                type: ELoadDocumentAction.LOAD_START,
                payload: null,
            });
            return documentService.getTCompleteDocument(docId)
            .then(doc => {
                store.dispatch({
                    type: ELoadDocumentAction.LOAD_SUCCESS,
                    payload: doc,
                });
                store.dispatch({
                    type: ECashDocuments.ADD_DOCUMENT,
                    payload: doc,
                });
            })
            .catch(error => {
                store.dispatch({
                    type: ELoadDocumentAction.LOAD_ERROR,
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
                    type: ELoadDocumentAction.LOAD_SUCCESS,
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

    return {
        loadDocumentList,
        selectDocument,
    };
};
