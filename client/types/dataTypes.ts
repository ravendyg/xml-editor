import { EErrorCodes } from 'client/types/enums';


/**
 * List of available documents
 *
 * @prop {string} name File name
 */
export declare type DocumentInfo = {
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
