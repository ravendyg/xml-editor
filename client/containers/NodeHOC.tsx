import * as React from 'react';
import { connect } from 'react-redux';

import {
    TCompleteDocument,
    TNode,
} from 'client/types/dataTypes';
import { IState } from 'client/types/state';
import { TagEnd } from '../components/TagEnd';
import { TagStart } from '../components/TagStart';

/**
 * @prop {number} id
 * @prop {number} level How deep it is situated in the tree
 * @prop {number} index
 */
export interface INodeProps {
    id: string;
    level: number;
    index: number;
}

/**
 * @prop {number} index
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
    index: number;
    level: number;
    node: TNode;
}

export const Node = (props: IProps): JSX.Element => {
    const { node, index, level } = props;

    // TODO: If node has no children use /> for closing
    return(
        <div>
            <TagStart node={node} index={index} level={level}/>
            {node.children.map((id, index) =>
                <NodeHOC
                    key={index}
                    id={id}
                    index={index}
                    level={level + 1}
                />
            )}
            <TagEnd node={node} level={level}/>
        </div>
    );
};

const mapStateToProps = (state: IState, props: INodeProps): IProps => {
    const
        data = state.activeDocument.data as TCompleteDocument,  // null has been handled before
        node = data.model[props.id],
        { index, level } = props
        ;

    return {
        index,
        level,
        node,
    };
};

export const NodeHOC = connect(mapStateToProps)(Node);
