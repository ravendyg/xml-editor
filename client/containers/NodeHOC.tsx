import * as React from 'react';
import { connect } from 'react-redux';

import { IActions } from 'client/actions';
import { EditTag } from 'client/components/EditTag';
import { Separator } from 'client/components/Separator';
import { TagEnd } from 'client/components/TagEnd';
import { TagStart } from 'client/components/TagStart';
import {
    TCompleteDocument,
    TModel,
    TNode,
} from 'client/types/dataTypes';
import { IState } from 'client/types/state';
import { searchInSubtree } from 'client/utils/searchInSubtree';

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
 * @prop {boolean} beingEdited Is this node being edited
 * @prop {string} draggedElement Dragged elemetn id
 * @prop {TModel} model Complete model
 * @prop {TNode} node
 */
interface IProps extends IOwnProps {
    beingEdited: boolean;
    draggedElement: string;
    model: TModel;
    node: TNode | undefined;
}

export const Node = (props: IProps): JSX.Element | null => {
    const { actions, beingEdited, model, draggedElement, id, level, node } = props;
    if (!node) {
        return null;
    } else if (beingEdited) {
        return(
            <EditTag
                actions={actions}
                id={id}
                level={level}
                node={node}
            />
        );
    } else {
        const { children } = node;
        const droppable = draggedElement.length > 0 && !searchInSubtree(model, id, draggedElement);

        return(
            <div>
                {id !== 'root' && (
                    <Separator
                        actions={actions}
                        droppable={droppable}
                        id={id}
                    />
                )}
                <TagStart
                    actions={actions}
                    droppable={droppable}
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
                {children.length ?
                    (
                        <Separator
                            actions={actions}
                            droppable={droppable}
                            id={id}
                            tail
                        />
                    )
                    : null
                }
                {children.length ? <TagEnd node={node} level={level}/> : null}
            </div>
        );
    }
};

// this way mapper will be called for each node on any state change, even modal opening
// better create a HOC for the whole 'model' and convert NodeHOC to PureComponent
const mapStateToProps = (state: IState, props: IOwnProps): IProps => {
    const
        data = state.activeDocument.data as TCompleteDocument,  // null has been handled before
        draggedElement = state.drag,
        editedNode = state.editedNode,
        node = data.model[props.id]
        ;

    return {
        ...props,
        beingEdited: props.id === editedNode,
        draggedElement,
        model: data.model,
        node,
    };
};

export const NodeHOC = connect(mapStateToProps)(Node);
