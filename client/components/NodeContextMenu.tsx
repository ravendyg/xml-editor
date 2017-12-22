import * as React from 'react';

import { IActions } from 'client/actions';
import { TNodeContextMenu } from 'client/types/dataTypes';

interface INodeContextMenuProps {
    actions: IActions;
    menuInfo: TNodeContextMenu;
}

export const NodeContextMenu = (props: INodeContextMenuProps) => {
    const { actions, menuInfo: { id, x, y } } = props;
    const style = {
        transform: `translate(${x}px, ${y}px)`,
    };
    const removeNode = () => {
        actions.removeNode(id);
        actions.hideAllModals();
    };
    const addChild = () => {
        actions.addEmptyChild(id);
        actions.hideAllModals();
    };

    return(
        <ul
            className="node-context-menu"
            style={style}
        >
            <li
                className="node-context-menu--item"
                onClick={addChild}
            >Add a child</li>
            <li
                className="node-context-menu--item"
                onClick={removeNode}
            >Remove</li>
        </ul>
    );
};
