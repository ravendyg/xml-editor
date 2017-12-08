import { Store } from 'redux';

import { TDocumentInfo, TCompleteDocument } from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IError } from 'client/types/dataTypes';
import { Dispatch } from 'redux';

export interface IStore extends Store<IState> {}

export interface IState {
    activeDocument: IActiveDocument;
    documentList: IDocumentList;
    cashDocument: ICashDocument;
}

export declare type TDispatch = Dispatch<IState>;

/**
 * @prop {TDocumentInfo []} data List of available document
 * @prop {IError | null} error
 * @prop {ELoadStatus} status Request status
 */
export interface IDocumentList {
    data: TDocumentInfo [];
    error: IError | null;
    status: ELoadStatus;
}

/**
 * @prop {TCompleteDocument} data Loaded document
 * @prop {IError | null} error
 * @prop {ELoadStatus} status Request status
 */
export interface IActiveDocument {
    data: TCompleteDocument | null;
    error: IError | null;
    status: ELoadStatus;
}

/**
 * @prop {TCompleteDocument} docId
 */
export interface ICashDocument {
    [docId: string]: TCompleteDocument;
}
