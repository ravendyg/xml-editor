import * as React from 'react';

import { Attribute } from 'client/components/Attribute';
import { TAG_OFFSET } from 'client/consts';
import { TNode } from 'client/types/dataTypes';

/**
 * @prop {string} id Node identifier
 * @prop {number} index Element index among children
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
    id: string;
    index: number;
    level: number;
    node: TNode;
}

// TODO: Check that a Node that has not been changed doesn't rerender due to `connect`
// otherwise replace with PureComponent
export const TagStart = ({ node: { attrs, name }, index, level }: IProps) => {
    // does not display 'document' as a separate entity
    if (name === 'document') {
        return null;
    }

    // TODO: Replace spans with clickable components
    let tagBody =
        attrs.map(
            ({name, value}, attrIndex) => (
                <Attribute
                    key={`${index}.${attrIndex}`}
                    name={name}
                    value={value}
                />
            )
        )
        ;
    const offset = (level * TAG_OFFSET);
    const tagStyle = offset
        ? { marginLeft: offset + 'px' }
        : {}
        ;
    tagBody.push(<span key={`${index}.${attrs.length}.0`}>{'>'}</span>);

    return(
        <div>
            <span className="tag-start" style={tagStyle}>{`<${name}`}</span>
            {tagBody}
        </div>
    );
};
