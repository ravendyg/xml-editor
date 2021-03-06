import * as React from 'react';

import { IActions } from 'client/actions';
import {
    TAG_OFFSET,
    TAG_OFFSET_STEP,
} from 'client/consts';
import { KEY_CODES } from 'client/consts';
import {
    TMaybeInput,
    TNode,
    TNodeInfo,
} from 'client/types/dataTypes';
import { createNodeKey } from 'client/utils/generators';
import { parseEditInput } from 'client/utils/parseEditInput';

/**
 * @prop {IActions} actions All actions
 * @prop {string} id Node identifier
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node Node itself
 */
interface IProps {
    actions: IActions;
    id: string;
    level: number;
    node: TNode;
}

export class EditTag extends React.PureComponent<IProps, {}> {
    private input: TMaybeInput;

    componentDidMount() {
        setImmediate(this.focusOnInput);
    }

    /**
     * Tag edit input lost focus
     * Reducer will understand is it an update of an already existing node
     * or a creation of a brand new one
     *
     * @param {React.SyntheticEvent<HTMLInputElement>} event
     */
    handleBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const text = (event.target as HTMLInputElement).value;
        const { actions, id, node: { parent } } = this.props;
        const key = (id && id !== 'empty') ? id : createNodeKey();
        const parsedInput = parseEditInput(text);
        const { tagName } = parsedInput;

        if (tagName) {
            const nodeInfo: TNodeInfo = {
                key,
                ...parsedInput,
                parent,
            };
            actions.updateNode(nodeInfo);
        } else if (id === 'empty') {
            actions.removeNode('empty');
        } else {
            actions.stopEditNode();
        }
    }

    /**
     * Tag edit input submit
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event
     */
    handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case KEY_CODES.Enter: {
                (event.target as HTMLInputElement).blur();
                break;
            }
            case KEY_CODES.Esc: {
                (event.target as HTMLInputElement).value = '';
                (event.target as HTMLInputElement).blur();
                break;
            }
        }
    }

    /**
     * Update reference
     */
    setInput = (ref: TMaybeInput) => this.input = ref;

    /**
     * Set focus on the input field (after it has been created)
     */
    focusOnInput = () => {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const {
            node: { attrs, tagName },
            level
        } = this.props;

        const offset = TAG_OFFSET + (level * TAG_OFFSET_STEP);
        const tagStyle = offset
            ? { marginLeft: offset + 'px' }
            : {}
            ;

        let text = '';
        attrs.forEach(
            ({attrName, value}) => {
                text += value
                    ? ` ${attrName}="${value}"`
                    : ` ${attrName} `
                    ;
            }
        );
        text = tagName + text;

        return(
            <div className="tag-start">
                <input
                    defaultValue={text.trim()}
                    className={'tag-start--input'}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyUp}
                    ref={this.setInput}
                    style={tagStyle}
                />
            </div>
        );
    }
}
