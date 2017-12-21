import {
    ECashDocuments,
    EDocumentAction,
    EDocumentListAction,
} from 'client/types/actions';
import {
    TCompleteDocument,
    TDocumentInfo,
    TMoveInfo,
    TNodeInfo,
} from 'client/types/dataTypes';
import { IStore } from 'client/types/state';

declare type TActionCreator<P> = (payload: P) => void;
declare type TActionCreatorWithouArgs = () => void;

export interface IActionCreators {
    addDocument: TActionCreator<TCompleteDocument | null>;
    confirmDocLoad: TActionCreator<TCompleteDocument | null>;
    confirmListLoad: TActionCreator<TDocumentInfo[]>;
    errorDocLoad: TActionCreator<Error>;
    errorListLoad: TActionCreator<Error>;
    moveNode: TActionCreator<TMoveInfo>;
    removeNode: TActionCreator<string>;
    startDocLoad: TActionCreatorWithouArgs;
    startListLoad: TActionCreatorWithouArgs;
    updateNode: TActionCreator<TNodeInfo>;
}

export const createActionCreators = (store: IStore): IActionCreators => ({
    addDocument(payload: TCompleteDocument | null) {
        store.dispatch({ type: ECashDocuments.ADD_DOCUMENT, payload });
    },

    confirmDocLoad(payload: TCompleteDocument | null) {
        store.dispatch({ type: EDocumentAction.LOAD_SUCCESS, payload });
    },

    confirmListLoad(payload: TDocumentInfo[]) {
        store.dispatch({ type: EDocumentListAction.LOAD_SUCCESS, payload });
    },

    errorDocLoad(payload: Error) {
        store.dispatch({ type: EDocumentAction.LOAD_ERROR, payload });
    },

    errorListLoad(payload: Error) {
        store.dispatch({ type: EDocumentListAction.LOAD_ERROR, payload });
    },

    moveNode(payload: TMoveInfo) {
        store.dispatch({ type: EDocumentAction.MOVE_NODE, payload });
    },

    removeNode(payload: string) {
        store.dispatch({ type: EDocumentAction.REMOVE_NODE, payload });
    },

    startDocLoad() {
        store.dispatch({ type: EDocumentAction.LOAD_START, payload: null });
    },

    startListLoad() {
        store.dispatch({ type: EDocumentListAction.LOAD_START, payload: null });
    },

    updateNode(payload: TNodeInfo) {
        store.dispatch({ type: EDocumentAction.UPDATE_NODE, payload });
    },
});
