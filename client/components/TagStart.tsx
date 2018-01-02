import * as React from 'react';

import { IActions } from 'client/actions';
import {
    TAG_OFFSET,
    TAG_OFFSET_STEP,
} from 'client/consts';
import { TNode } from 'client/types/dataTypes';

/**
 * @prop {IActions} actions All actions
 * @prop {boolean} droppable Can the dragged element be droppped here
 * @prop {string} id Node identifier
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
    actions: IActions;
    droppable: boolean;
    id: string;
    level: number;
    node: TNode;
}

/**
 * @prop {EHoverMode} hover
 */
interface IState {
    hovered: boolean;
}

// TODO: remove move btns, replace with drag&drop
export class TagStart extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            hovered: false,
        };
    }

    /**
     * Handle right click on the node start tag
     */
    handleContextMenu = (event: React.SyntheticEvent<HTMLElement>) => {
        const nativeEvent = event.nativeEvent as MouseEvent;
        nativeEvent.preventDefault();
        const { clientX, clientY } = nativeEvent;
        const { id } = this.props;
        const { actions: { showNodeContextMenu } } = this.props;
        showNodeContextMenu({id, x: clientX, y: clientY});
    }

    handleDragEnter = () => {
        const { droppable, node: { children } } = this.props;
        if (droppable && children.length === 0) {
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
     * Handle drag start
     */
    handleDragStart = () => {
        const { actions: { startDrag }, id } = this.props;
        startDrag(id);
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

    /**
     * Handle drop element
     */
    handleDrop = () => {
        const {
            actions: { moveNodeToEnd },
            id,
            droppable,
        } = this.props;
        if (droppable) {
            moveNodeToEnd(id);
        }
    }

    /**
     * Toggle editor
     */
    toggleeditedNode = () => {
        const { actions, id } = this.props;
        actions.editNode(id);
    }

    render() {
        const {
            level,
            node: { attrs, children, tagName },
        } = this.props;

        // does not display 'document' as a separate entity
        if (tagName === 'document') {
            return null;
        }

        let text = '';
        attrs.forEach(
            ({attrName, value}) => {
                text += value
                    ? ` ${attrName}="${value}"`
                    : ` ${attrName} `
                    ;
            }
        );

        const offset = TAG_OFFSET + (level * TAG_OFFSET_STEP);
        const tagStyle = offset
            ? { marginLeft: offset + 'px' }
            : {}
            ;

        let element;
        const suffix =
            (attrs.length ? ' ' : '')
            + (children.length ? '>' : '/>')
            ;
        text = `<${tagName}${text}${suffix}`;
        element = (
            <span
                className={'tag-start--tag'}
                style={tagStyle}
                onDragOver={this.handleDragover}
                onDrop={this.handleDrop}
            >
                {text}
            </span>
        );

        const className = 'tag-start'
            + (this.state.hovered ? ' hovered' : '')
            ;

        return(
            <div
                className={className}
                draggable
                onContextMenu={this.handleContextMenu}
                onDoubleClick={this.toggleeditedNode}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragover}
                onDrop={this.handleDrop}
                title="Right click for more options"
            >
                {element}
            </div>
        );
    }
}
