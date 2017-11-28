import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { HeaderHOC } from 'client/containers/headerHOC';
import { store } from 'client/store';

const App = () => (
    <Provider store={store}>
        <HeaderHOC />
    </Provider>
);

render(
    <App />,
    document.getElementById('app'),
);
