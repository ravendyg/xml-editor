import * as React from 'react';

import { IActions } from 'client/actions';
import { TModel } from 'client/types/dataTypes';
import { searchInSubtree } from 'client/utils';

/**
 * @prop {IActions} actions All actions connected to redux
 * @prop {string} id Parent node id
 * @prop {string} draggedElement Id of the element being dragged
 * @prop {TModel} model Complete model, need for checks that the node is not being dragged inside itself
 * @prop {boolean} [tail] Has separator been placed in the end of the children list
 */
interface IProps {
    actions: IActions;
    id: string;
    draggedElement: string;
    model: TModel;
    tail?: boolean;
}

/**
 * @prop {boolean} hovered
 */
interface IState {
    hovered: boolean;
}

export class Separator extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            hovered: false,
        };
    }

    handleDragEnter = () => {
        this.setState({
            hovered: true,
        });
    }

    handleDragLeave = () => {
        this.setState({
            hovered: false,
        });
    }

    render() {
        const { hovered } = this.state;
        let className = 'separator--line';
        if (hovered) {
            // this way it won't traverse the nodes tree when it's not necessary
            const { draggedElement, id, model } = this.props;
console.log('sep - ', id, draggedElement);
            const isInSubtree = searchInSubtree(model, id, draggedElement);
            console.log(draggedElement, id);
            className += !isInSubtree ? ' active' : '';
        }
        return(
            <div
                className="separator--wrapper"
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
            >
                <div className={className}></div>
            </div>
        );
    }
}
