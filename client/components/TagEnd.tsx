import * as React from 'react';

import { TAG_OFFSET } from 'client/consts';
import {TNode} from 'client/types/dataTypes';

/**
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
    level: number;
    node: TNode;
}

export const TagEnd = ({ node: { name }, level }: IProps) => {
    // does not display 'document' as a separate entity
    if (name === 'document') {
        return null;
    }

    const offset = (level * TAG_OFFSET);
    const tagStyle = offset
        ? { marginLeft: offset + 'px' }
        : {}
        ;

    return(
        <div>
            <span className="tag-end" style={tagStyle}>{`</${name}>`}</span>
        </div>
    );
};
