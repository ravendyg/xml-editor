import { IDocumentService } from 'client/types/services';
import { DocumentInfo, CompleteDocument } from 'client/types/dataTypes';

const docList = [
    {
        id: 'doc1',
        name: 'document 1',
    },
    {
        id: 'doc2',
        name: 'document 2',
    },
];

const docs: {[key: string]: CompleteDocument} = {
    doc1: {
        id: 'doc1',
        name: 'document 1',
    },
    doc2: {
        id: 'doc2',
        name: 'document 2',
    },
}

export const documentService: IDocumentService = {
    getDocumentList(): Promise<DocumentInfo []> {
        // TODO: replace with an actual call to the server
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(docList);
            }, 1000);
        });
    },

    getCompleteDocument(docId: string): Promise<CompleteDocument> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(docs[docId]);
            }, 1000);
        });
    },
};
