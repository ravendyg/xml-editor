import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { createActions } from 'client/actions';
import { HeaderHOC } from 'client/containers/HeaderHOC';
import { ViewHOC } from 'client/containers/ViewHOC';
import { documentService } from 'client/services/DocumentService';
import { store } from 'client/store';

try {
    if (process.env.BROWSER) {
        require('./styles.scss');
    }
} catch (e) {/**/}

const actions = createActions(store, documentService);

const App = () => (
    <Provider store={store}>
        <div>
            <HeaderHOC actions={actions} />
            <ViewHOC actions={actions} />
        </div>
    </Provider>
);

render(
    <App />,
    document.getElementById('app'),
);
