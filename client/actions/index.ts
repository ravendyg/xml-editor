import { IDocumentService } from 'client/types/services';
import { EDocumentListAction, ELoadDocumentAction, ECashDocuments } from 'client/types/actions';
import { IStore } from 'client/types/state';
import { TCompleteDocument } from 'client/types/dataTypes';

export interface IActions {
    loadDocumentList: () => Promise<void>;
    selectDocument: (docId: string) => Promise<void>;
}

export const createActions = (store: IStore, documentService: IDocumentService): IActions => ({
    loadDocumentList() {
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
        })
        .catch(error => {
            debugger
            store.dispatch({
                type: EDocumentListAction.LOAD_ERROR,
                payload: error,
            });
        });
    },

    selectDocument(docId: string) {
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
    },
});
