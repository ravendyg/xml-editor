import * as React from 'react';

import { IActions } from 'client/actions';
import {
    TAG_OFFSET,
    TAG_OFFSET_STEP,
} from 'client/consts';
import {
    TModel,
    TNode,
} from 'client/types/dataTypes';

/**
 * Check whether the node is not a child of another one
 *
 * @param model
 * @param nodeId
 */
const isSuccessor = (model: TModel, nodeId: string, targetId: string): boolean => {

};

/**
 * @prop {IActions} actions All actions
 * @prop {string} draggedElement An id of the element being dragged
 * @prop {string} id Node identifier
 * @prop {number} level How deep it is situated in the tree
 * @prop {TModel} model Complete model, need for checks that the node is not being dragged inside itself
 * @prop {TNode} node
 */
interface IProps {
    actions: IActions;
    draggedElement: string;
    id: string;
    level: number;
    model: TModel;
    node: TNode;
}

/**
 * Hover states
 * @prop {number} NONE No hover
 * @prop {number} TOP Over the top half
 * @prop {number} BOTTOM Over the bottom half
 */
const enum EHoverMode {
    NONE = 1,
    TOP = 2,
    BOTTOM = 3,
}

/**
 * @prop {EHoverMode} hover
 */
interface IState {
    hover: EHoverMode;
}

// TODO: remove move btns, replace with drag&drop
export class TagStart extends React.PureComponent<IProps, IState> {

    private ref: HTMLElement | null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            hover: EHoverMode.NONE,
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

    /**
     * Handle drag over
     *
     * @param {React.SyntheticEvent<any>} event
     */
    handleDragOver = (event: React.SyntheticEvent<any>) => {
        const { ref } = this;
        const { hover } = this.state;
        const { draggedElement, id } = this.props;

        // don't show borders when dragging over itself
        if (draggedElement === id) {
            return;
        }

        if (ref) {
            const nativeEvent = event.nativeEvent as DragEvent;
            const {layerY} = nativeEvent;
            const height = ref.offsetHeight;

            if (layerY / height < 0.5) {
                if (hover !== EHoverMode.TOP) {
                    this.setState({
                        hover: EHoverMode.TOP,
                    });
                }
            } else {
                if (hover !== EHoverMode.BOTTOM) {
                    this.setState({
                        hover: EHoverMode.BOTTOM,
                    });
                }
            }
        }
    }

    /**
     * Handle drag leaving the element
     */
    handleDragLeave = () => {
        this.setState({
            hover: EHoverMode.NONE,
        });
    }

    /**
     * Handle drag start
     */
    handleDragStart = () => {
        const { actions: { startDrag }, id } = this.props;
        startDrag(id);
    }

    /**
     * Handle drag stop
     */
    handleDragStop = () => {
        const { actions: { stopDrag } } = this.props;
        stopDrag();
    }

    /**
     * Toggle editor
     */
    toggleeditedNode = () => {
        const { actions, id } = this.props;
        actions.editNode(id);
    }

    /**
     * Ref the wrapper
     */
    getWrapperRef = (ref: HTMLElement | null) => {
        this.ref = ref;
    }

    render() {
        const {
            node: { attrs, children, tagName },
            level,
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
            >
                {text}
            </span>
        );

        const { hover } = this.state;
        let className = 'tag-start';
        if (hover === EHoverMode.BOTTOM) {
            className += ' hover-bottom';
        } else if (hover === EHoverMode.TOP) {
            className += ' hover-top';
        }

        return(
            <div
                className={className}
                draggable
                onContextMenu={this.handleContextMenu}
                onDoubleClick={this.toggleeditedNode}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragStop}
                onDragLeave={this.handleDragLeave}
                onDragOver={this.handleDragOver}
                ref={this.getWrapperRef}
                title="Right click for more options"
            >
                {element}
            </div>
        );
    }
}
