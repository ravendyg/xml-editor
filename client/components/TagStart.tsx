import * as React from 'react';

import { IActions } from 'client/actions';
import {
    TAG_OFFSET,
    TAG_OFFSET_STEP,
} from 'client/consts';
import { KEY_CODES } from 'client/consts';
import {
    TNode,
    TNodeInfo,
} from 'client/types/dataTypes';
import { parseEditInput } from 'client/utils/parseEditInput';

declare type EMaybeInput = HTMLInputElement | null;

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

/**
 * Attribute state
 *
 * @prop {boolean} beingEdited Is attribute being edited right now
 */
interface IState {
    beingEdited: boolean;
}

export class TagStart extends React.PureComponent<IProps, IState> {
    private input: EMaybeInput;

    constructor(props: IProps) {
        super(props);
        this.state = {
            beingEdited: false,
        };
    }

    /**
     * Tag edit input lost focus
     *
     * @param {React.SyntheticEvent<HTMLInputElement>} event
     */
    handleBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const text = (event.target as HTMLInputElement).value;
        const { actions, id, node: { parent } } = this.props;
        const nodeInfo: TNodeInfo = {
            key: id,
            ...parseEditInput(text),
            parent,
        };
        actions.updateNode(nodeInfo);
        this.toggleBeingEdited();
    }

    /**
     * Tag edit input submit
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event
     */
    handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === KEY_CODES.Enter) {
            (event.target as HTMLInputElement).blur();
        }
    }

    /**
     * Create children click handler
     */
    handleCreateClick = () => {
        console.log('Add children to ' + this.props.id);
    }

    /**
     * Remove node click handler
     */
    handleRemoveClick = () => {
        const { id, actions: { removeNode } } = this.props;
        removeNode(id);
    }

    /**
     * Toggle editor
     */
    toggleBeingEdited = () => {
        this.setState((prevState: IState) => ({
            beingEdited: !prevState.beingEdited,
        }));
    }

    /**
     * Update reference
     */
    setInput = (ref: EMaybeInput) => this.input = ref;

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
            node: { attrs, children, tagName },
            level,
        } = this.props;
        const { beingEdited } = this.state;

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
        if (beingEdited) {
            setImmediate(this.focusOnInput);
            text = tagName + text;
            // matching input and it's content width would require to much of an effort
            element = (
                <input
                    defaultValue={text}
                    className={'tag-start--input'}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyUp}
                    ref={this.setInput}
                    style={tagStyle}
                />
            );
        } else {
            const suffix =
                (attrs.length ? ' ' : '')
                + (children.length ? '>' : '/>')
                ;
            text = `<${tagName}${text}${suffix}`;
            element = (
                <span
                    className={'tag-start--tag'}
                    onDoubleClick={this.toggleBeingEdited}
                    style={tagStyle}
                >
                    {text}
                </span>
            );
        }

        return(
            <div className="tag-start">
                <span className="tag-start--btns">
                    <button
                        onClick={this.handleCreateClick}
                        title="Add children"
                    >+</button>
                    <button
                        onClick={this.handleRemoveClick}
                        title="Remove node"
                    >X</button>
                </span>
                {element}
            </div>
        );
    }
}
