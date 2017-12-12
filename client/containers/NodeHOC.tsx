import * as React from 'react';
import { connect } from 'react-redux';

import {
    TCompleteDocument,
    TNode,
} from 'client/types/dataTypes';
import { IState } from 'client/types/state';

export interface INodeProps {
    id: string;
}

interface IProps {
    node: TNode;
}

export const Node = (props: IProps) => {
    const { node } = props;

    // does not display 'document' as a separate entity
    return(
        <div>{node.name !== 'document' && ('Node ' + node.name)}</div>
    );
};

const mapStateToProps = (state: IState, props: INodeProps): IProps => {
    const
        data = state.activeDocument.data as TCompleteDocument,  // null has been handled before
        node = data.model[props.id]
        ;

    return {
        node,
    };
};

export const NodeHOC = connect(mapStateToProps)(Node);
