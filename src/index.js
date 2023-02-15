import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import './styles/normalize.scss';
import './styles/global.scss';
import 'font-awesome/css/font-awesome.min.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);
