import { AnyAction } from 'redux';

import {
    TCompleteDocument,
    TDocumentInfo,
} from 'client/types/dataTypes';
import {
    IError,
    TMoveInfo,
    TNodeContextMenu,
    TNodeInfo,
} from 'client/types/dataTypes';

export interface IAction<T, P> extends AnyAction {
    type: T;
    payload: P;
}

export const enum EDocumentListActions {
    LOAD_START = 'DOCUMENT_LIST_LOAD_START',
    LOAD_SUCCESS = 'DOCUMENT_LIST_LOAD_SUCCESS',
    LOAD_ERROR = 'DOCUMENT_LIST_LOAD_ERROR',
}

export declare type TDocumentListAction =
    IAction<EDocumentListActions.LOAD_START, null>
    | IAction<EDocumentListActions.LOAD_SUCCESS, TDocumentInfo[]>
    | IAction<EDocumentListActions.LOAD_ERROR, IError>
    ;

export const enum EDocumentActions {
    LOAD_START = 'DOCUMENT_LOAD_START',
    LOAD_SUCCESS = 'DOCUMENT_LOAD_SUCCESS',
    LOAD_ERROR = 'DOCUMENT_LOAD_ERROR',
    ADD_EMPTY_CHILD = 'ADD_EMPTY_CHILD',
    EDIT_EXISTING_NODE = 'EDIT_EXISTING_NODE',
    STOP_EDITING = 'STOP_EDITING',
    MOVE_NODE_TO_END = 'MOVE_NODE_TO_END',
    MOVE_NODE_TO_END_BEFORE = 'MOVE_NODE_TO_END_BEFORE',
    UPDATE_NODE = 'UPDATE_NODE',
    REMOVE_NODE_TO_END = 'REMOVE_NODE_TO_END',
}

export declare type TDocumentAction =
    IAction<EDocumentActions.LOAD_START, null>
    | IAction<EDocumentActions.LOAD_SUCCESS, TCompleteDocument>
    | IAction<EDocumentActions.LOAD_ERROR, IError>
    | IAction<EDocumentActions.ADD_EMPTY_CHILD, string>
    | IAction<EDocumentActions.STOP_EDITING, null>
    | IAction<EDocumentActions.EDIT_EXISTING_NODE, string>
    | IAction<EDocumentActions.MOVE_NODE_TO_END, TMoveInfo>
    | IAction<EDocumentActions.MOVE_NODE_TO_END_BEFORE, TMoveInfo>
    | IAction<EDocumentActions.UPDATE_NODE, TNodeInfo>
    | IAction<EDocumentActions.REMOVE_NODE_TO_END, string>
    ;

export const enum ECashDocuments {
    ADD_DOCUMENT = 'CASH_ADD_DOCUMENT',
    REMOVE_DOCUMENT = 'CASH_REMOVE_DOCUMENT',
}

export declare type TCashDocumentsAction =
    IAction<ECashDocuments.ADD_DOCUMENT, TCompleteDocument>
    | IAction<ECashDocuments.REMOVE_DOCUMENT, string>
    ;

export const enum EModalsActions {
    HIDE_ALL_MODALS = 'HIDE_ALL_MODALS',
    SHOW_NODE_CONTEXT_MENU = 'SHOW_NODE_CONTEXT_MENU',
}

export declare type TModalsAction =
    IAction<EModalsActions.HIDE_ALL_MODALS, null>
    | IAction<EModalsActions.SHOW_NODE_CONTEXT_MENU, TNodeContextMenu>
    ;

export const enum EDragActions {
    START_DRAG = 'START_DRAG',
    STOP_DRAG = 'STOP_DRAG',
}

export declare type TDragAction =
    IAction<EDragActions.START_DRAG, string>
    | IAction<EDragActions.STOP_DRAG, null>
    ;
