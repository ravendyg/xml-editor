import * as React from 'react';

import {
    TAG_OFFSET,
    TAG_OFFSET_STEP,
} from 'client/consts';
import {TNode} from 'client/types/dataTypes';

/**
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
    level: number;
    node: TNode;
}

export const TagEnd = ({ node: { tagName }, level }: IProps) => {
    // does not display 'document' as a separate entity
    if (tagName === 'document') {
        return null;
    }

    const offset = TAG_OFFSET + (level * TAG_OFFSET_STEP);
    const tagStyle = offset
        ? { marginLeft: offset + 'px' }
        : {}
        ;

    return(
        <div className="tag-end">
            <span style={tagStyle}>{`</${tagName}>`}</span>
        </div>
    );
};
