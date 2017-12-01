import { DocumentInfo } from 'client/types/dataTypes';

export interface IDocumentListService {
    getDocumentList: () => Promise<DocumentInfo []>;
}
