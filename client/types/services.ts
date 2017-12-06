import { DocumentInfo, CompleteDocument } from 'client/types/dataTypes';

export interface IDocumentService {
    getDocumentList: () => Promise<DocumentInfo []>;
    getCompleteDocument: (docId: string) => Promise<CompleteDocument>;
}
