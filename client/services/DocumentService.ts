import { IDocumentService } from 'client/types/services';
import { TDocumentInfo, TCompleteDocument } from 'client/types/dataTypes';

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

const docs: {[key: string]: TCompleteDocument} = {
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
    getDocumentList(): Promise<TDocumentInfo []> {
        // TODO: replace with an actual call to the server
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(docList);
            }, 1000);
        });
    },

    getTCompleteDocument(docId: string): Promise<TCompleteDocument> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(docs[docId]);
            }, 1000);
        });
    },
};
