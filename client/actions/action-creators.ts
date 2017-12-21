import {
    ECashDocuments,
    EDocumentAction,
    EDocumentListAction,
    EModalsActions,
} from 'client/types/actions';
import {
    TCompleteDocument,
    TDocumentInfo,
    TMoveInfo,
    TNodeContextMenu,
    TNodeInfo,
} from 'client/types/dataTypes';
import { IStore } from 'client/types/state';

declare type TActionCreator<P> = (payload: P) => void;
declare type TActionCreatorWithouArgs = () => void;

// TODO: If there will be to many of them, split into separate action creators
export interface IActionCreators {
    // cash
    addDocument: TActionCreator<TCompleteDocument | null>;
    // lst
    confirmDocLoad: TActionCreator<TCompleteDocument | null>;
    confirmListLoad: TActionCreator<TDocumentInfo[]>;
    errorListLoad: TActionCreator<Error>;
    startListLoad: TActionCreatorWithouArgs;
    // document
    errorDocLoad: TActionCreator<Error>;
    moveNode: TActionCreator<TMoveInfo>;
    removeNode: TActionCreator<string>;
    startDocLoad: TActionCreatorWithouArgs;
    updateNode: TActionCreator<TNodeInfo>;
    // modals
    showNodeContextMenu: TActionCreator<TNodeContextMenu>;
    hideAllModals: TActionCreatorWithouArgs;
}

export const createActionCreators = (store: IStore): IActionCreators => ({
    // cash
    addDocument(payload: TCompleteDocument | null) {
        store.dispatch({ type: ECashDocuments.ADD_DOCUMENT, payload });
    },

    // list
    confirmDocLoad(payload: TCompleteDocument | null) {
        store.dispatch({ type: EDocumentAction.LOAD_SUCCESS, payload });
    },

    confirmListLoad(payload: TDocumentInfo[]) {
        store.dispatch({ type: EDocumentListAction.LOAD_SUCCESS, payload });
    },

    errorListLoad(payload: Error) {
        store.dispatch({ type: EDocumentListAction.LOAD_ERROR, payload });
    },

    startListLoad() {
        store.dispatch({ type: EDocumentListAction.LOAD_START, payload: null });
    },

    // document
    errorDocLoad(payload: Error) {
        store.dispatch({ type: EDocumentAction.LOAD_ERROR, payload });
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

    updateNode(payload: TNodeInfo) {
        store.dispatch({ type: EDocumentAction.UPDATE_NODE, payload });
    },

    // modals
    showNodeContextMenu(payload: TNodeContextMenu) {
        store.dispatch({ type: EModalsActions.SHOW_NODE_CONTEXT_MENU, payload });
    },

    hideAllModals() {
        store.dispatch({ type: EModalsActions.HIDE_ALL_MODALS, payload: null });
    },
});
