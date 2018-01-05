import { Store } from 'redux';

import {
    IConstArray,
    TCompleteDocument,
    TDocumentInfo,
} from 'client/types/dataTypes';
import {
    IError,
    TNodeContextMenu,
} from 'client/types/dataTypes';
import {
    ELoadStatus,
    EModalTypes,
} from 'client/types/enums';
import { Dispatch } from 'redux';

/**
 * App store
 */
export interface IStore extends Store<IState> {}

/**
 * App state
 */
export interface IState {
    activeDocument: IActiveDocument;
    drag: string;
    editedNode: string;
    cacheDocument: ICashDocument;
    documentList: IDocumentList;
    modals: IConstArray<EModal>;
}

/**
 * Dispatch with app state
 */
export declare type TDispatch = Dispatch<IState>;

/**
 * Maybe list of existing documents
 *
 * @prop {IConstArray<TDocumentInfo>} data List of available document
 * @prop {IError | null} error
 * @prop {ELoadStatus} status Request status
 */
export interface IDocumentList {
    data: IConstArray<TDocumentInfo>;
    error: IError | null;
    status: ELoadStatus;
}

/**
 * Maybe currently selected document
 *
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
 * Local storage for documents
 * Cache and temp storage for not yet saved changes
 *
 * @prop {TCompleteDocument} docId
 */
export interface ICashDocument {
    [docId: string]: TCompleteDocument;
}

/**
 * List of modal windows
 */
export declare type EModal =
    { type: EModalTypes.NODE_CONTEXT, payload: TNodeContextMenu }
    ;
