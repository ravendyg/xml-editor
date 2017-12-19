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

    it('parses tag name and one attribute with value', () => {
        const res = parseEditInput('div class="qwe"');
        assert.deepEqual(res, {
            attrs: [{
                name: 'class',
                value: 'qwe',
            }],
            name: 'div',
        });
    });

    it('parses tag name and multiple attribute with value', () => {
        const res = parseEditInput('div class="qwe" id="some-id"');
        assert.deepEqual(res, {
            attrs: [{
                name: 'class',
                value: 'qwe',
            }, {
                name: 'id',
                value: 'some-id',
            }],
            name: 'div',
        });
    });

    it('parses tag name and one attribute without value', () => {
        const res = parseEditInput('div checked');
        assert.deepEqual(res, {
            attrs: [{
                name: 'checked',
            }],
            name: 'div',
        });
    });

    it('parses tag name and multiple attribute without value', () => {
        const res = parseEditInput('content checked approved');
        assert.deepEqual(res, {
            attrs: [{
                name: 'checked',
            }, {
                name: 'approved',
            }],
            name: 'content',
        });
    });

    it('parses tag name and multiple mixed attribute', () => {
        const res = parseEditInput('section checked class="some_class" approved');
        assert.deepEqual(res, {
            attrs: [{
                name: 'checked',
            }, {
                name: 'class',
                value: 'some_class',
            }, {
                name: 'approved',
            }],
            name: 'section',
        });
    });

    it('ignores additional spaces', () => {
        const res = parseEditInput('\t content checked approved    ');
        assert.deepEqual(res, {
            attrs: [{
                name: 'checked',
            }, {
                name: 'approved',
            }],
            name: 'content',
        });
    });

    it('ignores unsupported symbols', () => {
        const res = parseEditInput('content@ class="$qwe^" approved="@RLY"');
        assert.deepEqual(res, {
            attrs: [{
                name: 'class',
                value: 'qwe',
            }, {
                name: 'approved',
                value: 'RLY',
            }],
            name: 'content',
        });
    });

});
