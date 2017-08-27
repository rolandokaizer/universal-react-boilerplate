import React from 'react';
import { render } from 'react-dom';

import App from '../shared/src/components/app';

render(
    <App />,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept();
}
