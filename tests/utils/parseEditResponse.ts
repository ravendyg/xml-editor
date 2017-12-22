import { assert } from 'chai';
import { parseEditInput } from 'client/utils';

describe('parse tag info', () => {

    it('parses only tag attrName', () => {
        const res = parseEditInput('div');
        assert.deepEqual(res, {
            attrs: [],
            tagName: 'div',
        });
    });

    it('parses tag name and one attribute without value', () => {
        const res = parseEditInput('div checked');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'checked',
            }],
            tagName: 'div',
        });
    });

    it('parses tag name and multiple attribute without value', () => {
        const res = parseEditInput('content checked approved');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'checked',
            }, {
                attrName: 'approved',
            }],
            tagName: 'content',
        });
    });

    it('parses tag name and one attribute with value', () => {
        const res = parseEditInput('div class="qwe"');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'class',
                value: 'qwe',
            }],
            tagName: 'div',
        });
    });

    it('parses tag name and multiple attribute with value', () => {
        const res = parseEditInput('div class="qwe" id="some-id"');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'class',
                value: 'qwe',
            }, {
                attrName: 'id',
                value: 'some-id',
            }],
            tagName: 'div',
        });
    });

    it('parses tag name and multiple mixed attribute', () => {
        const res = parseEditInput('section checked class="some_class" approved');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'checked',
            }, {
                attrName: 'class',
                value: 'some_class',
            }, {
                attrName: 'approved',
            }],
            tagName: 'section',
        });
    });

    it('ignores additional spaces', () => {
        const res = parseEditInput('\t content checked approved    ');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'checked',
            }, {
                attrName: 'approved',
            }],
            tagName: 'content',
        });
    });

    it('handles case with a space and a colon in an attr value', () => {
        const res = parseEditInput('content style="color: red;"');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'style',
                value: 'color: red;',
            }],
            tagName: 'content',
        });
    });

    it('ignores unsupported symbols', () => {
        const res = parseEditInput('content class="$qwe^" approved="@RLY"');
        assert.deepEqual(res, {
            attrs: [{
                attrName: 'class',
                value: 'qwe',
            }, {
                attrName: 'approved',
                value: '@RLY',
            }],
            tagName: 'content',
        });
    });

    it('throws if there is no tag name', () => {
        try {
            parseEditInput('content="checked approved    "');
            throw new Error('Should not be here');
        } catch (e) {
            assert.equal(e.message, 'Missing tag name');
        }
    });

});
