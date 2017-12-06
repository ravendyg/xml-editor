import { Store } from 'redux';

import { DocumentInfo, CompleteDocument } from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IError } from 'client/types/dataTypes';
import { Dispatch as Disp } from 'redux';

export interface IStore extends Store<IState> {}

export interface IState {
    activeDocument: IActiveDocument;
    documentList: IDocumentList;
    cashDocument: ICashDocument;
}

export declare type Dispatch = Disp<IState>;

/**
 * @prop {DocumentInfo []} data List of available document
 * @prop {IError | null} error
 * @prop {ELoadStatus} status Request status
 */
export interface IDocumentList {
    data: DocumentInfo [];
    error: IError | null;
    status: ELoadStatus;
}

/**
 * @prop {CompleteDocument} data Loaded document
 * @prop {IError | null} error
 * @prop {ELoadStatus} status Request status
 */
export interface IActiveDocument {
    data: CompleteDocument | null;
    error: IError | null;
    status: ELoadStatus;
}

/**
 * @prop {CompleteDocument} docId
 */
export interface ICashDocument {
    [docId: string]: CompleteDocument;
}
