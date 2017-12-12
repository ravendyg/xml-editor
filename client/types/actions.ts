import { AnyAction } from 'redux';

import {
    TCompleteDocument,
    TDocumentInfo,
} from 'client/types/dataTypes';
import { IError } from 'client/types/dataTypes';

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

export const enum ELoadDocumentAction {
    LOAD_START = 'DOCUMENT_LOAD_START',
    LOAD_SUCCESS = 'DOCUMENT_LOAD_SUCCESS',
    LOAD_ERROR = 'DOCUMENT_LOAD_ERROR',
}

export declare type LoadDocumentAction =
    IAction<ELoadDocumentAction.LOAD_START, null>
    | IAction<ELoadDocumentAction.LOAD_SUCCESS, TCompleteDocument>
    | IAction<ELoadDocumentAction.LOAD_ERROR, IError>
    ;

export const enum ECashDocuments {
    ADD_DOCUMENT = 'CASH_ADD_DOCUMENT',
    REMOVE_DOCUMENT = 'CASH_REMOVE_DOCUMENT',
}

export declare type CashDocumentsAction =
    IAction<ECashDocuments.ADD_DOCUMENT, TCompleteDocument>
    | IAction<ECashDocuments.REMOVE_DOCUMENT, string>
    ;
