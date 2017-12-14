import * as React from 'react';

/**
 * Attribute props
 *
 * @prop {string} name
 * @prop {string} [value]
 */
interface IProps {
    name: string;
    value?: string;
}

/**
 * Attribute state
 *
 * @prop {boolean} beingEdited Is attribute being edited right now
 */
interface IAttributeState {
    beingEdited: boolean;
}

export class Attribute extends React.PureComponent<IProps, IAttributeState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            beingEdited: false,
        };
    }
    render() {
        const { name, value } = this.props;
        const text = value
            ? `${name}="${value}"`
            : name
            ;

        return(
            <span className="attr-start">{text}</span>
        );
    }
}

