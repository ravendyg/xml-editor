import * as React from 'react';
import { connect } from 'react-redux';

import { IActions } from 'client/actions';
import { NodeContextMenu } from 'client/components/NodeContextMenu';
import { IConstArray } from 'client/types/dataTypes';
import { EModalTypes } from 'client/types/enums';
import {
    EModal,
    IState,
} from 'client/types/state';

const hasAmongParent = (node: HTMLElement | null, attrName: string, attrRegexp: RegExp): boolean => {
    if (node) {
        const parent = node.parentElement;
        if (!parent) {
            return false;
        } else {
            const attrValue = parent.getAttribute(attrName) || '';
            return attrRegexp.test(attrValue)
                ? true
                : hasAmongParent(parent, attrName, attrRegexp)
                ;
        }
    } else {
        return false;
    }
};

const mapModalInfoToComponents = (modals: IConstArray<EModal>, actions: IActions) => {
    return modals
    .map((modal, index) => {
        switch (modal.type) {
            case EModalTypes.NODE_CONTEXT: {
                return(
                    <NodeContextMenu
                        actions={actions}
                        key={index}
                        menuInfo={modal.payload}
                    />
                );
            }
            default: {
                return null;
            }
        }
    })
    .filter(e => !!e)
    ;
};

const containerClassName = 'modals-container';

const containerClassNameRegExp = new RegExp(containerClassName);

interface IOwnProps {
    actions: IActions;
}

/**
 * @prop {Document} doc Global document
 * @prop {IConstArray<EModal>} modals List of modal windows
 */
interface IProps extends IOwnProps {
    doc: Document;
    modals: IConstArray<EModal>;
}

// don't mix up a container containing modal windows and a container aka HOC
export class ModalsContainer extends React.Component<IProps, {}> {
    componentDidMount() {
        const { doc } = this.props;
        doc.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        const { doc } = this.props;
        doc.addEventListener('click', this.handleClick);
    }

    /**
     * On click traverse the tree - if clicked outside the wrapper, close all modals (maybe need to limit it to the topmost only)
     *
     * @param {MouseEvent} event
     */
    handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!hasAmongParent(target, 'class', containerClassNameRegExp)) {
            this.props.actions.hideAllModals();
        }
    }

    handleContext = (event: React.SyntheticEvent<any>) => {
        const { modals } = this.props;
        const lastModal = modals[modals.length - 1] || { type: '' };
        if (lastModal.type === EModalTypes.NODE_CONTEXT) {
            event.nativeEvent.preventDefault();
        }
    }

    render() {
        const { actions, modals } = this.props;
        const modalComponents = mapModalInfoToComponents(modals, actions);
        return(
            modalComponents.length
                ? (
                    <div className={containerClassName} onContextMenu={this.handleContext}>
                        {modalComponents}
                    </div>
                )
                : null
        );
    }
}

const mapStateToProps = (state: IState, props: IOwnProps): IProps => {
    const { modals } = state;
    return {
        ...props,
        doc: document,
        modals,
    };
};

export const ModalsHOC = connect(mapStateToProps)(ModalsContainer);
