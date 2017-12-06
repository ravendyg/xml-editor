import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { HeaderHOC } from 'client/containers/HeaderHOC';
import { ViewHOC } from 'client/containers/ViewHOC';
import { store } from 'client/store';
import { documentService } from 'client/services/DocumentService';
import { createActions } from 'client/actions';

try {
    process.env.BROWSER && require('./styles.scss');
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
