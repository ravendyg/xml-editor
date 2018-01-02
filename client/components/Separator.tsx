import * as React from 'react';

import { IActions } from 'client/actions';
import { TModel } from 'client/types/dataTypes';
import { searchInSubtree } from 'client/utils';

/**
 * @prop {IActions} actions All actions connected to redux
 * @prop {string} id Node separator goes before (or in the end of the children list if tail provided)
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

    /**
     * Handle drag over, otherwise drop won't fire
     */
    handleDragover = (e: React.SyntheticEvent<any>) => {
        const { nativeEvent } = e;
        nativeEvent.preventDefault();
    }

    handleDrop = () => {
        const {
            actions: {
                moveNodeBefore,
                moveNodeToEnd,
            },
            id,
            draggedElement,
            tail = false,
        } = this.props;
        const moveAction = tail ? moveNodeToEnd : moveNodeBefore;
        moveAction({ key: draggedElement, target: id, });
    }

    render() {
        const { hovered } = this.state;
        let className = 'separator--line';
        if (hovered) {
            // this way it won't traverse the nodes tree when it's not necessary
            // it lags quite a lot, but not sure how to fix it yet
            // maybe calculate classes on drag start?
            const { draggedElement, id, model } = this.props;
            const isInSubtree = searchInSubtree(model, id, draggedElement);
            className += !isInSubtree ? ' active' : ' inactive';
        }
        return(
            <div
                className="separator--wrapper"
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDragOver={this.handleDragover}
                onDrop={this.handleDrop}
            >
                <div
                    className={className}
                    onDragOver={this.handleDragover}
                    onDrop={this.handleDrop}
                ></div>
            </div>
        );
    }
}
