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
 * @prop {TAttribute[]} attrs
 * @prop {string[]} children Children ids
 * @prop {string} parent Node parent
 * @prop {string} tagName Like div, span, etc.
 */
export declare type TNode = {
    attrs: TAttribute[];
    children: string[];
    parent: string;
    tagName: string;
};

/**
 * Transport container for node update info (children not included)
 *
 * @prop {TAttribute[]} attrs
 * @prop {string} parent Node parent
 * @prop {string} tagName Like div, span, etc.
 */
export declare type TNodeInfo = {
    attrs: TAttribute[];
    key: string;
    parent: string;
    tagName: string;
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
