import {
    EErrorCodes,
} from 'client/types/enums';

/**
 * Really constant array
 *
 * https://github.com/Microsoft/TypeScript/issues/2426
 * The author wouldn't recommend to use it, but I'm just curious how far can one go
 *
 * Therefore had to reimplement 'Iterable' lost when passing through 'Omit'
 * http://exploringjs.com/es6/ch_iteration.html
 */
interface Iterable<T> {
    [Symbol.iterator]() : Iterator<T>;
}
interface Iterator<T> {
    next() : IteratorResult<T>;
}
interface IteratorResult<T> {
    value: T;
    done: boolean;
}

type StringLiteralDiff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, StringLiteralDiff<keyof T, K>>;

/**
 * loosing sort is a pity, but it mutates the array, use
 * const a: IConstArray<number> = [/ members /];
 * let b: number[] = [...a];
 * const c: IConstArray<number> = b.sort((e1, e2) => e1 - e2);
 */
export interface IConstArray<T> extends
    Omit<Array<T>, 'push' | 'pop' | 'shift' | 'unshift' | 'sort'>,
    Iterable<T> {
        readonly [n: number]: T;
    }

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
 * @prop {IConstArray<TAttribute>} attrs
 * @prop {IConstArray<string>} children Children ids
 * @prop {string} parent Node parent
 * @prop {string} tagName Like div, span, etc.
 */
export declare type TNode = {
    attrs: IConstArray<TAttribute>;
    children: IConstArray<string>;
    parent: string;
    tagName: string;
};

/**
 * Transport container for node update info (children not included)
 *
 * @prop {IConstArray<TAttribute>} attrs
 * @prop {string} parent Node parent
 * @prop {string} tagName Like div, span, etc.
 */
export declare type TNodeInfo = {
    attrs: IConstArray<TAttribute>;
    key: string;
    parent: string;
    tagName: string;
};

/**
 * Complete model
 */
export declare type TModel = { [key: string]: TNode };

/**
 * Complete document
 *
 * @prop {string} id Unique identifier
 * @prop {string} name Human readable
 */
export declare type TCompleteDocument = {
    id: string;
    name: string;
    model: TModel;
};

/**
 * Custom error
 *
 * @prop {EErrorCodes} code Error code
 */
export interface IError extends Error {
    code: EErrorCodes;
}

/**
 * @prop {string} key Node being moved
 * @prop {string} target Node relative to which the move has been done
 */
export declare type TMoveInfo = {
    key: string;
    target: string;
};

/**
 * Information about context menu
 *
 * @prop {string} id Node id
 * @prop {number} x X coordinate of the click
 * @prop {number} y Y coordinate of the click
 */
export declare type TNodeContextMenu = {
    id: string;
    x: number;
    y: number;
};

export declare type TMaybeInput = HTMLInputElement | null;
