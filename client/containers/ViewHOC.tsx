import * as React from 'react';
import { connect } from 'react-redux';

import { IState, IActiveDocument } from 'client/types/state';
import { ELoadStatus } from 'client/types/enums';
import { Spinner } from 'client/components/Spinner'
import { IActions } from 'client/actions';

interface IOwnProps {
    actions: IActions;
}

interface IProps extends IOwnProps, IActiveDocument {

}

export class View extends React.Component<IProps, {}> {
    render() {
        const { data, status } = this.props;
        let content;
        switch (status) {
            case ELoadStatus.RUNNING: {
                content = <Spinner/>;
                break;
            }
            case ELoadStatus.IDLE: {
                if (data) {
                    content = data.name;
                } else {
                    content = 'Select a document';
                }
                break;
            }
            case ELoadStatus.ERROR: {
                content = <div>Some error happened</div>;
                break;
            }
        }

        return(
            <div className="view-wrapper">
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state: IState, props: IOwnProps): IProps => {
    return {
        ...props,
        ...state.activeDocument,
    };
};

export const ViewHOC = connect(mapStateToProps)(View);
