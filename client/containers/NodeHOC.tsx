import * as React from 'react';
import { connect } from 'react-redux';

import { IActions } from 'client/actions';
import {
    TCompleteDocument,
    TNode,
} from 'client/types/dataTypes';
import { IState } from 'client/types/state';
import { TagEnd } from '../components/TagEnd';
import { TagStart } from '../components/TagStart';

/**
 * @prop {IActions} actions All actions connected to redux
 * @prop {number} id
 * @prop {number} level How deep it is situated in the tree
 */
interface IOwnProps {
    actions: IActions;
    id: string;
    level: number;
}

/**
 * @prop {TNode} node
 */
interface IProps extends IOwnProps {
    node: TNode | undefined;
}

export const Node = (props: IProps): JSX.Element | null => {
    const { actions, id, level, node } = props;
    if (!node) {
        return null;
    }

    const { children } = node;

    // TODO: If node has no children use /> for closing
    return(
        <div>
            <TagStart
                actions={actions}
                id={id}
                level={level}
                node={node}
            />
            {children.map((id, index) =>
                <NodeHOC
                    key={index}
                    actions={actions}
                    id={id}
                    level={level + 1}
                />
            )}
            {children.length ? <TagEnd node={node} level={level}/> : null}
        </div>
    );
};

const mapStateToProps = (state: IState, props: IOwnProps): IProps => {
    const
        data = state.activeDocument.data as TCompleteDocument,  // null has been handled before
        node = data.model[props.id]
        ;

    return {
        ...props,
        node,
    };
};

export const NodeHOC = connect(mapStateToProps)(Node);
