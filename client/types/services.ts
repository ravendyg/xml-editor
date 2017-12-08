import { TDocumentInfo, TCompleteDocument } from 'client/types/dataTypes';

export interface IDocumentService {
    getDocumentList: () => Promise<TDocumentInfo []>;
    getTCompleteDocument: (docId: string) => Promise<TCompleteDocument>;
}
