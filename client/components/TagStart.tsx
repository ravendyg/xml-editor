import * as React from 'react';

import { TAG_OFFSET } from 'client/consts';
import { TNode } from 'client/types/dataTypes';

/**
 * @prop {number} index Element index among children
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
export interface ITagStartProps {
    index: number;
    level: number;
    node: TNode;
}

// TODO: Check that a Node that has not been changed doesn't rerender due to `connect`
// otherwise replace with PureComponent
export const TagStart = ({ node: { attrs, name }, index, level }: ITagStartProps) => {
    // does not display 'document' as a separate entity
    if (name === 'document') {
        return null;
    }

    // TODO: Replace spans with clickable components
    const tagBody =
        attrs.map(
            ({name, value}, attrIndex) => {
                let attr = [<span key={`${index}.${attrIndex}.0`} className="attr-start">{name}</span>];
                if (value) {
                    attr.push(<span key={`${index}.${attrIndex}.1`}>{'='}</span>);
                    attr.push(<span key={`${index}.${attrIndex}.2`}>{`"${value}"`}</span>);
                }
                return attr;
            }
        )
        .reduce((acc, element) => acc.concat(element), [])
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
