import { Store } from 'redux';

import { DocumentInfo } from 'client/types/dataTypes';
import { ELoadStatus } from 'client/types/enums';
import { IError } from 'client/types/dataTypes';

export interface IStore extends Store<IState> {}

export interface IState {
    documentList: IDocumentList;
}

/**
 * @prop {DocumentInfo []} data List of available document
 * @prop {}
 * @prop {ELoadStatus} status Request status
 */
export interface IDocumentList {
    data: DocumentInfo [];
    error: IError | null;
    status: ELoadStatus;
}
