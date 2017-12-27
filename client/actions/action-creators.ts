import {
    ECashDocuments,
    EDocumentActions,
    EDocumentListActions,
    EDragActions,
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
declare type TActionCreatorWithoutArgs = () => void;

// TODO: If there will be to many of them, split into separate action creators
export interface IActionCreators {
    // cash
    addDocument: TActionCreator<TCompleteDocument | null>;
    // list
    confirmDocLoad: TActionCreator<TCompleteDocument | null>;
    confirmListLoad: TActionCreator<TDocumentInfo[]>;
    errorListLoad: TActionCreator<Error>;
    startListLoad: TActionCreatorWithoutArgs;
    // document
    addChild: TActionCreator<string>;
    editNode: TActionCreator<string>;
    errorDocLoad: TActionCreator<Error>;
    moveNode: TActionCreator<TMoveInfo>;
    removeNode: TActionCreator<string>;
    startDocLoad: TActionCreatorWithoutArgs;
    stopNodeEditing: TActionCreatorWithoutArgs;
    updateNode: TActionCreator<TNodeInfo>;
    // modals
    showNodeContextMenu: TActionCreator<TNodeContextMenu>;
    hideAllModals: TActionCreatorWithoutArgs;
    // drag
    startDrag: TActionCreator<string>;
    stopDrag: TActionCreatorWithoutArgs;
}

export const createActionCreators = (store: IStore): IActionCreators => ({
    // cash
    addDocument(payload: TCompleteDocument | null) {
        store.dispatch({ type: ECashDocuments.ADD_DOCUMENT, payload });
    },

    // list
    confirmDocLoad(payload: TCompleteDocument | null) {
        store.dispatch({ type: EDocumentActions.LOAD_SUCCESS, payload });
    },

    confirmListLoad(payload: TDocumentInfo[]) {
        store.dispatch({ type: EDocumentListActions.LOAD_SUCCESS, payload });
    },

    errorListLoad(payload: Error) {
        store.dispatch({ type: EDocumentListActions.LOAD_ERROR, payload });
    },

    startListLoad() {
        store.dispatch({ type: EDocumentListActions.LOAD_START, payload: null });
    },

    // document
    addChild(payload: string) {
        store.dispatch({ type: EDocumentActions.ADD_EMPTY_CHILD, payload });
    },

    editNode(payload: string) {
        store.dispatch({ type: EDocumentActions.EDIT_EXISTING_NODE, payload });
    },

    errorDocLoad(payload: Error) {
        store.dispatch({ type: EDocumentActions.LOAD_ERROR, payload });
    },

    moveNode(payload: TMoveInfo) {
        store.dispatch({ type: EDocumentActions.MOVE_NODE, payload });
    },

    removeNode(payload: string) {
        store.dispatch({ type: EDocumentActions.REMOVE_NODE, payload });
    },

    startDocLoad() {
        store.dispatch({ type: EDocumentActions.LOAD_START, payload: null });
    },

    stopNodeEditing() {
        store.dispatch({ type: EDocumentActions.STOP_EDITING, payload: null });
    },

    updateNode(payload: TNodeInfo) {
        store.dispatch({ type: EDocumentActions.UPDATE_NODE, payload });
    },

    // modals
    showNodeContextMenu(payload: TNodeContextMenu) {
        store.dispatch({ type: EModalsActions.SHOW_NODE_CONTEXT_MENU, payload });
    },

    hideAllModals() {
        store.dispatch({ type: EModalsActions.HIDE_ALL_MODALS, payload: null });
    },

    // drag
    startDrag(payload: string) {
        store.dispatch({ type: EDragActions.START_DRAG, payload });
    },

    stopDrag() {
        store.dispatch({ type: EDragActions.STOP_DRAG, payload: null });
    },

});
