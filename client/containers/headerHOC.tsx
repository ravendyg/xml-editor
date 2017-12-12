import * as React from 'react';
import { connect } from 'react-redux';

import { IActions } from 'client/actions';
import { HeaderLink } from 'client/components/HeaderLink';
import { Spinner } from 'client/components/Spinner';
import { ELoadStatus } from 'client/types/enums';
import {
    IDocumentList,
    IState,
} from 'client/types/state';

interface IOwnProps {
    actions: IActions;
}

interface IProps extends IOwnProps, IDocumentList {
}

export class Header extends React.Component<IProps, {}> {
    componentWillMount() {
        const { actions: { loadDocumentList } } = this.props;
        loadDocumentList();
    }

    render() {
        const { data, status, actions: { selectDocument } } = this.props;
        let content;
        switch (status) {
            case ELoadStatus.RUNNING: {
                content = <Spinner/>;
                break;
            }
            case ELoadStatus.IDLE: {
                content = (
                    <ul className="header-list">
                        {data.map(doc => (
                            <HeaderLink
                                key={doc.id}
                                doc={doc}
                                handleSelect={selectDocument}
                            />
                        ))}
                    </ul>
                );
                break;
            }
            case ELoadStatus.ERROR: {
                content = <div>Some error happened</div>;
                break;
            }
        }

        return(
            <div className="header-wrapper">
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state: IState, props: IOwnProps): IProps => {
    return {
        ...props,
        ...state.documentList
    };
};

export const HeaderHOC = connect(mapStateToProps)(Header);
