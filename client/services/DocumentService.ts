import {
    TCompleteDocument,
    TDocumentInfo,
} from 'client/types/dataTypes';
import { IDocumentService } from 'client/types/services';

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
        model: {
            'root': {
                name: 'document',
                attrs: [],
                children: ['q', 'w'],
            },
            'q': {
                name: 'div',
                attrs: [{
                        name: 'color', value: 'green',
                    }, {
                        name: 'checked'
                }],
                children: ['a', 's'],
            },
            'w': {
                name: 'div',
                attrs: [],
                children: ['d'],
            },
            'a': {
                name: 'span',
                attrs: [{
                        name: 'id', value: 'some-id',
                    }, {
                        name: 'class', value: 'some-class'
                }],
                children: [],
            },
            's': {
                name: 'span',
                attrs: [],
                children: [],
            },
            'd': {
                name: 'span',
                attrs: [],
                children: [],
            },
        },
    },
    doc2: {
        id: 'doc2',
        name: 'document 2',
        model: {
            'root': {
                name: 'document',
                attrs: [],
                children: [],
            },
        },
    },
};

export const documentService: IDocumentService = {
    getDocumentList(): Promise<TDocumentInfo []> {
        // TODO: replace with an actual call to the server
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(docList);
            }, 1);
        });
    },

    getTCompleteDocument(docId: string): Promise<TCompleteDocument> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(docs[docId]);
            }, 1);
        });
    },
};
