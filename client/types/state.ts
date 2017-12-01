import { Store } from 'redux';

import { DocumentInfo } from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IError } from 'client/types/dataTypes';

export interface IStore extends Store<IState> {}

export interface IState {
    documentList: IDocumentList;
    activeDocument: IActiveDocument;
}

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
 * @prop {DocumentInfo} data Loaded document
 * @prop {IError | null} error
 * @prop {ELoadStatus} status Request status
 */
export interface IActiveDocument {
    data: DocumentInfo | null;
    error: IError | null;
    status: ELoadStatus;
}
