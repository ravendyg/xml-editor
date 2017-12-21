import { AnyAction } from 'redux';

import {
    TCompleteDocument,
    TDocumentInfo,
} from 'client/types/dataTypes';
import {
    IError,
    TMoveInfo,
    TNodeInfo,
} from 'client/types/dataTypes';

export interface IAction<T, P> extends AnyAction {
    type: T;
    payload: P;
}

export const enum EDocumentListAction {
    LOAD_START = 'DOCUMENT_LIST_LOAD_START',
    LOAD_SUCCESS = 'DOCUMENT_LIST_LOAD_SUCCESS',
    LOAD_ERROR = 'DOCUMENT_LIST_LOAD_ERROR',
}

export declare type TDocumentListAction =
    IAction<EDocumentListAction.LOAD_START, null>
    | IAction<EDocumentListAction.LOAD_SUCCESS, TDocumentInfo []>
    | IAction<EDocumentListAction.LOAD_ERROR, IError>
    ;

export const enum EDocumentAction {
    LOAD_START = 'DOCUMENT_LOAD_START',
    LOAD_SUCCESS = 'DOCUMENT_LOAD_SUCCESS',
    LOAD_ERROR = 'DOCUMENT_LOAD_ERROR',
    ADD_EMPTY_CHILDREN = 'ADD_EMPTY_CHILDREN',
    MOVE_NODE = 'MOVE_NODE',
    UPDATE_NODE = 'UPDATE_NODE',
    REMOVE_NODE = 'REMOVE_NODE',
}

export declare type DocumentAction =
    IAction<EDocumentAction.LOAD_START, null>
    | IAction<EDocumentAction.LOAD_SUCCESS, TCompleteDocument>
    | IAction<EDocumentAction.LOAD_ERROR, IError>
    | IAction<EDocumentAction.ADD_EMPTY_CHILDREN, string>
    | IAction<EDocumentAction.MOVE_NODE, TMoveInfo>
    | IAction<EDocumentAction.UPDATE_NODE, TNodeInfo>
    | IAction<EDocumentAction.REMOVE_NODE, string>
    ;

export const enum ECashDocuments {
    ADD_DOCUMENT = 'CASH_ADD_DOCUMENT',
    REMOVE_DOCUMENT = 'CASH_REMOVE_DOCUMENT',
}

export declare type CashDocumentsAction =
    IAction<ECashDocuments.ADD_DOCUMENT, TCompleteDocument>
    | IAction<ECashDocuments.REMOVE_DOCUMENT, string>
    ;
