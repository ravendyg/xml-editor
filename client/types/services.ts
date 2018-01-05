import {
    IConstArray,
    TCompleteDocument,
    TDocumentInfo,
} from 'client/types/dataTypes';

export interface IDocumentService {
    getDocumentList: () => Promise<IConstArray<TDocumentInfo>>;
    getTCompleteDocument: (docId: string) => Promise<TCompleteDocument>;
}
