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
 * Complete document
 */
export declare type TCompleteDocument = {
    id: string;
    name: string;
};

/**
 * Custom error
 *
 * @prop {EErrorCodes} code Error code
 */
export interface IError extends Error {
    code: EErrorCodes;
}
