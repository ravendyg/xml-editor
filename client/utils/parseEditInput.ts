import { TAttribute } from 'client/types/dataTypes';

enum EMode {
    OUT = 'OUT',
    INNAME = 'INNAME',
    INVAL = 'INVAL',
}

/**
 * Parse whatever was entered as a tag name and attributes
 *
 * @param {string} input
 */
export const parseEditInput = (input: string): {name: string, attrs: TAttribute[]} => {
    let mode: EMode = EMode.OUT;
    let name = '';
    let attrs: TAttribute[] = [];
    let start = 0;

    // TODO: refactor it's to complex now
    for (let i = 0; i < input.length; i++) {
        const letter = input[i];
        switch (letter) {
            case ' ': {
                switch (mode) {
                    case EMode.OUT: {
                        break;
                    }
                    case EMode.INNAME: {
                        if (name) {
                            let attr: TAttribute = {
                                name: input.slice(start, i),
                            };
                            attrs.push(attr);
                        } else {
                            name = input.slice(start, i);
                        }
                        mode = EMode.OUT;
                        break;
                    }
                    case EMode.INVAL: {
                        break;
                    }
                }
                break;
            }
            case '=': {
                switch (mode) {
                    case EMode.OUT: {
                        throw new Error('Lose =');
                    }
                    case EMode.INNAME: {
                        if (!name) {
                            throw new Error('Missing tag name');
                        } else {
                            let attr: TAttribute = {
                                name: input.slice(start, i),
                            };
                            attrs.push(attr);
                        }
                        mode = EMode.INVAL;
                        break;
                    }
                    case EMode.INVAL: {
                        // allow '=' in attribute values
                        break;
                    }
                }
                break;
            }
            case '"': {
                switch (mode) {
                    case EMode.OUT: {
                        throw new Error('Lose "');
                    }
                    case EMode.INNAME: {
                        start = i;
                        break;
                    }
                }
                break;
            }
            default: {
                switch (mode) {
                    case EMode.OUT: {
                        start = i;
                        mode = EMode.INNAME;
                        break;
                    }
                    case EMode.INNAME: {
                        break;
                    }
                    case EMode.INVAL: {
                        break;
                    }
                }
            }
        }
    }

    switch (mode) {
        case EMode.OUT: {
            // spaces?
            break;
        }
        case EMode.INNAME: {
            const term = input.slice(start);
            if (!name) {
                name = term;
            } else {
                attrs.push({
                    name: term,
                });
            }
        }
    }

    return {
        attrs,
        name,
    };
};
