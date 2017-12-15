import { assert } from 'chai';
import { parseEditInput } from 'client/utils/parseEditInput';

describe('parse tag info', () => {

    it('parses only tag name', () => {
        const res = parseEditInput('div');
        assert.deepEqual(res, {
            attrs: [],
            name: 'div',
        });
    });

});
