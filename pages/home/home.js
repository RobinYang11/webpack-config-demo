import React from 'react';
import * as  ReactDOM from 'react-dom/client';

import App from './App';
import './home.less';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render(<App/>);

