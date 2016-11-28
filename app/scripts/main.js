import ReactDom from 'react-dom';

import headers from './headers';
import router from './router';

const container = document.getElementById('container');

headers();

ReactDom.render(router, container);
