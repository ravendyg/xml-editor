import { AnyAction } from 'redux';

import {DocumentInfo} from 'client/types/dataTypes';
import { IError } from 'client/types/dataTypes';

export declare type Dispatch = (action: IAction<any, any>) => void;

export interface IAction<T, P> extends AnyAction {
    type: T;
    payload: P;
}

export const enum EDocumentListAction {
    DOCUMENT_LIST_LOAD_START = 'DOCUMENT_LIST_LOAD_START',
    DOCUMENT_LIST_LOAD_SUCCESS = 'DOCUMENT_LIST_LOAD_SUCCESS',
    DOCUMENT_LIST_LOAD_ERROR = 'DOCUMENT_LIST_LOAD_ERROR',
}

export declare type DocumentListAction =
    IAction<EDocumentListAction.DOCUMENT_LIST_LOAD_START, null>
    | IAction<EDocumentListAction.DOCUMENT_LIST_LOAD_SUCCESS, DocumentInfo []>
    | IAction<EDocumentListAction.DOCUMENT_LIST_LOAD_ERROR, IError>
    ;
