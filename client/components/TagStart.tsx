import * as React from 'react';

import { IActions } from 'client/actions';
import {
    TAG_OFFSET,
    TAG_OFFSET_STEP,
} from 'client/consts';
// import { KEY_CODES } from 'client/consts';
import {
    // TMaybeInput,
    TNode,
    // TNodeInfo,
} from 'client/types/dataTypes';
import { EMoveDirections } from 'client/types/enums';
// import { parseEditInput } from 'client/utils';

/**
 * @prop {IActions} actions All actions
 * @prop {string} id Node identifier
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
    actions: IActions;
    id: string;
    level: number;
    node: TNode;
}

// TODO: remove move btns, replace with drag&drop
export class TagStart extends React.PureComponent<IProps, {}> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            editedNode: false,
        };
    }

    /**
     * Move this node
     *
     * @param {EMoveDirections} direction
     */
    moveNode = (direction: EMoveDirections) => {
        const { actions: { moveNode }, id } = this.props;
        moveNode({
            key: id,
            direction,
        });
    }

    /**
     * Move this node up
     */
    handleMoveUp = () => this.moveNode(EMoveDirections.UP);

    /**
     * Move this node down
     */
    handleMoveDown = () => this.moveNode(EMoveDirections.DOWN);

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
                onDoubleClick={this.toggleeditedNode}
                style={tagStyle}
            >
                {text}
            </span>
        );

        return(
            <div className="tag-start" onContextMenu={this.handleContextMenu} title="Right click for more options">
                <span className="tag-start--btns">
                    <button
                        onClick={this.handleMoveUp}
                        title="Move node up"
                    >▲</button>
                    <button
                        onClick={this.handleMoveDown}
                        title="Move node down"
                    >▼</button>
                </span>
                {element}
            </div>
        );
    }
}
