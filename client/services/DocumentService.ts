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
                attrs: [],
                children: ['q', 'w'],
                parent: '',
                tagName: 'document',
            },
            'q': {
                attrs: [{
                    attrName: 'color', value: 'green',
                }, {
                    attrName: 'checked'
                }],
                children: ['a', 's'],
                parent: 'root',
                tagName: 'div',
            },
            'w': {
                attrs: [],
                children: ['d'],
                parent: 'root',
                tagName: 'div',
            },
            'a': {
                attrs: [{
                    attrName: 'id', value: 'some-id',
                }, {
                    attrName: 'class', value: 'some-class'
                }],
                children: [],
                parent: 'q',
                tagName: 'span',
            },
            's': {
                attrs: [],
                children: [],
                parent: 'q',
                tagName: 'span',
            },
            'd1': {
                attrs: [{
                    attrName: 'num1'
                }],
                children: [],
                parent: 'w',
                tagName: 'span',
            },
            'd2': {
                attrs: [{
                    attrName: 'num2'
                }],
                children: [],
                parent: 'w',
                tagName: 'span',
            },
            'd3': {
                attrs: [{
                    attrName: 'num3'
                }],
                children: [],
                parent: 'w',
                tagName: 'span',
            },
            'd4': {
                attrs: [{
                    attrName: 'num4'
                }],
                children: [],
                parent: 'w',
                tagName: 'span',
            },
        },
    },
    doc2: {
        id: 'doc2',
        name: 'document 2',
        model: {
            'root': {
                attrs: [],
                children: [],
                parent: '',
                tagName: 'document',
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
