import * as React from 'react';

import { DocumentInfo } from 'client/types/dataTypes';

interface IProps {
    doc: DocumentInfo;
    handleSelect: (docId: string) => void;
}

export class HeaderLink extends React.PureComponent<IProps, {}> {

    handleSelect = () => {
        const { handleSelect, doc: { id } } = this.props;
        handleSelect(id);
    };

    render() {
        const { doc } = this.props;
        return(
            <li className="header-link" onClick={this.handleSelect}>{doc.name}</li>
        );
    }
}
