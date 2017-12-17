import * as React from 'react';

import { TAG_OFFSET } from 'client/consts';
import { TNode } from 'client/types/dataTypes';

declare type EMaybeInput = HTMLInputElement | null;

/**
 * @prop {string} id Node identifier
 * @prop {number} level How deep it is situated in the tree
 * @prop {TNode} node
 */
interface IProps {
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
        console.log(text);
        // this.toggleBeingEdited();
    }

    toggleBeingEdited = () => {
        this.setState((prevState: IState) => ({
            beingEdited: !prevState.beingEdited,
        }));
    }

    /**
     * Update reference
     */
    setInput = (ref: EMaybeInput) => this.input = ref;

    focusOnInput = () => {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const { node: { attrs, children, name }, level } = this.props;
        const { beingEdited } = this.state;

        // does not display 'document' as a separate entity
        if (name === 'document') {
            return null;
        }

        let text = '';
        attrs.forEach(
            ({name, value}) => {
                text += value
                    ? ` ${name}="${value}"`
                    : ` ${name} `
                    ;
            }
        );

        const offset = (level * TAG_OFFSET);
        const tagStyle = offset
            ? { marginLeft: offset + 'px' }
            : {}
            ;

        let element;
        if (beingEdited) {
            setImmediate(this.focusOnInput);
            text = name + text;
            // matching input and it's content width would require to much of an effort
            element = (
                <input
                    defaultValue={text}
                    onBlur={this.handleBlur}
                    ref={this.setInput}
                    style={tagStyle}
                />
            );
        } else {
            const suffix =
                (attrs.length ? ' ' : '')
                + (children.length ? '>' : '/>')
                ;
            text = `<${name}${text}${suffix}`;
            element = (
                <span
                    onDoubleClick={this.toggleBeingEdited}
                    style={tagStyle}
                >
                    {text}
                </span>
            );
        }

        return(
            <div className="tag-start">
                {element}
            </div>
        );
    }
}
