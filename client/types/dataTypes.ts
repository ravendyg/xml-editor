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
 *
 * @prop {string} name
 * @prop {string} value
 */
export declare type TAttribute = {
    name: string;
    value: string;
};

/**
 * Node === tag
 *
 * @prop {string} name Like div, span, etc.
 * @prop {TAttribute[]} attrs
 * @prop {string[]} children Children ids
 */
export declare type TNode = {
    name: string;
    attrs: TAttribute[];
    children: string[];
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
