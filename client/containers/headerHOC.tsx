import * as React from 'react';
import { connect } from 'react-redux';

import { IState, IDocumentList } from 'client/types/state';

interface IStateProps extends IDocumentList{
}

interface IDispatchProps {
}

interface IProps extends IStateProps, IDispatchProps {
}

interface IHeaderState {
}

export class Header extends React.PureComponent<IProps, IHeaderState> {
    render() {
        return(
            <div>header</div>
        );
    }
}

const mapStateToProps = (state: IState): IStateProps => ({
    ...state.documentList
});

const mapDispatchToProps = (): IDispatchProps => ({

});

const mergeProps = (stateProps: IStateProps, dispatchProps: IDispatchProps): IProps => ({
    ...stateProps,
    ...dispatchProps
});

export const HeaderHOC = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);
