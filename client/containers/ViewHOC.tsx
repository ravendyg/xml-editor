import * as React from 'react';
import { connect } from 'react-redux';

import { IActions } from 'client/actions';
import { Spinner } from 'client/components/Spinner';
import { NodeHOC } from 'client/containers/NodeHOC';
import { ELoadStatus } from 'client/types/enums';
import { IActiveDocument, IState } from 'client/types/state';

interface IOwnProps {
    actions: IActions;
}

interface IProps extends IOwnProps, IActiveDocument {
    status: ELoadStatus;
    exists: boolean;
}

export const View = (props: IProps) => {
    const { exists, data, status } = props;
    let content;
    switch (status) {
        case ELoadStatus.RUNNING: {
            content = <Spinner/>;
            break;
        }
        case ELoadStatus.IDLE: {
            if (exists) {
                if (data) {
                    content =
                        <NodeHOC
                            id={'root'}
                            level={0}
                        />;
                } else {
                    content = 'Select a document';
                }
            } else {
                content = 'Create your first document';
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
};

const mapStateToProps = (state: IState, props: IOwnProps): IProps => {
    const { activeDocument, documentList } = state;
    const doclist = documentList.data;
    return {
        ...props,
        ...activeDocument,
        exists: doclist && doclist.length > 0,
    };
};

export const ViewHOC = connect(mapStateToProps)(View);
