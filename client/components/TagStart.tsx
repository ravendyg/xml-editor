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
     * Handle drag start
     */
    handleDragStart = () => {
        const { actions: { startDrag }, id } = this.props;
        startDrag(id);
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
            node: { attrs, children, tagName },
            level,
        } = this.props;
        const { hovered } = this.state;

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

        const className = 'tag-start' +
            (hovered && children.length === 0 ? ' hovered' : '')
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
                title="Right click for more options"
            >
                {element}
            </div>
        );
    }
}
