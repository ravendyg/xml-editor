import * as React from 'react';

import { IActions } from 'client/actions';

/**
 * @prop {IActions} actions All actions connected to redux
 * @prop {string} id Node separator goes before (or in the end of the children list if tail provided)
 * @prop {boolean} droppable Can the dragged element be dropped here
 * @prop {boolean} [tail] Has separator been placed in the end of the children list
 */
interface IProps {
    actions: IActions;
    id: string;
    droppable: boolean;
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
        const { droppable } = this.props;
        if (droppable) {
            this.setState({
                hovered: true,
            });
        }
    }

    handleDragLeave = () => {
        if (this.state.hovered) {
            this.setState({
                hovered: false,
            });
        }
    }

    /**
     * Handle drag over, otherwise drop won't fire
     */
    handleDragover = (e: React.SyntheticEvent<any>) => {
        const { nativeEvent } = e;
        const { droppable } = this.props;
        if (droppable) {
            nativeEvent.preventDefault();
        }
    }

    handleDrop = () => {
        const {
            actions: {
                moveNodeBefore,
                moveNodeToStart,
            },
            id,
            droppable,
            tail = false,
        } = this.props;
        if (this.state.hovered) {
            this.setState({
                hovered: false,
            });
        }
        if (droppable) {
            const moveAction = tail ? moveNodeToStart : moveNodeBefore;
            moveAction(id);
        }
    }

    render() {
        const className = 'separator--line'
            + (this.state.hovered ? ' hovered' : '' )
            ;

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
