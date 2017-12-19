import { EErrorCodes } from 'client/types/enums';

/**
 * List of available documents
 *
 * @prop {string} name File name
 */
export declare type TDocumentInfo = {
    id: string;
    name: string;
};

/**
 * Node attribute
 * using [key: string]: value would be less verbose, but would require additional checks for whether attribute has one value
 *
 * @prop {string} name
 * @prop {string} [value]
 */
export declare type TAttribute = {
    attrName: string;
    value?: string;
};

/**
 * Node === tag
 *
 * @prop {string} name Like div, span, etc.
 * @prop {TAttribute[]} attrs
 * @prop {string[]} children Children ids
 */
export declare type TNode = {
    tagName: string;
    attrs: TAttribute[];
    children: string[];
};

/**
 * Transport container for node update info (children not included)
 */
export declare type TNodeInfo = {
    key: string;
    tagName: string;
    attrs: TAttribute[];
};

/**
 * Complete document
 *
 * @prop {string} id Unique identifier
 * @prop {string} name Human readable
 */
export declare type TCompleteDocument = {
    id: string;
    name: string;
    model: {
        [key: string]: TNode;
    };
};

/**
 * Custom error
 *
 * @prop {EErrorCodes} code Error code
 */
export interface IError extends Error {
    code: EErrorCodes;
}
