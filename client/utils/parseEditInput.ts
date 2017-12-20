import { TAttribute } from 'client/types/dataTypes';

const notAllowedSymbols = /[^=":;#@a-zA-Z0-9_-\s]/g;
const allowedInNameSymbols = /[a-zA-Z-_]/;

/**
 * Get tag name
 *
 * @param {string} input Assumes all \s were replaced with plain spaces
 */
const getTagName = (input: string) => {
    let i = 0;
    const trimed = input.trim();
    while (i < trimed.length && allowedInNameSymbols.test(trimed[i])) {
        i++;
    }
    if (i < trimed.length && trimed[i] !== ' ') {
        throw new Error('Missing tag name');
    }
    return {
        tagName: trimed.slice(0, i),
        rest: trimed.slice(i),
    };
};

/**
 * Split by not escaped spaces into meaningfull chunks
 *
 * @param {string} input
 */
const splitByNotescapedSpaces = (input: string) => {
    const trimed = input.trim();
    let escaped = false;
    for (let i = 0; i < trimed.length; i++) {
        if (trimed[i] === '"') {
            escaped = !escaped;
        } else if (!escaped && trimed[i] === ' ') {
            return {
                attr: trimed.slice(0, i),
                rest: trimed.slice(i),
            };
        }
    }

    return {
        attr: trimed,
        rest: '',
    };
};

/**
 * Parse attribute
 *
 * @param {string} input
 */
const parseAttribute = (input: string): TAttribute => {
    const [attrName, value] = input.split('=');
    let res: TAttribute = { attrName };
    if (value) {
        res.value = value.replace(/"/g, '');
    }
    return res;
};

/**
 * Parse whatever was entered as a tag name and attributes.
 * To save time didn't look XML spec, just used limited subset of allowed symbols.
 *
 * @param {string} input
 */
export const parseEditInput = (input: string) => {
    let attrs: TAttribute[] = [];

    const sanitized = input.replace(notAllowedSymbols, '').replace(/\s/g, ' ');
    let { tagName, rest } = getTagName(sanitized);

    while (rest) {
        const attrAndTheRest = splitByNotescapedSpaces(rest);
        attrs.push(parseAttribute(attrAndTheRest.attr));
        rest = attrAndTheRest.rest;
    }

    return {
        attrs,
        tagName,
    };
};
