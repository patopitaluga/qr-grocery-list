import * as path from 'path';

// __dirname missing when using --experimental-modules
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { controllerGetSetItem, } from './controllers/get-set-item.js';
import { controllerPostLogin, } from './controllers/post-login.js';
import { controllerGetItems, } from './controllers/get-items.js';
import { controllerGetItemDetail, } from './controllers/get-item-detail.js';

import { getAuth, } from 'firebase/auth';
const auth = getAuth();

/**
 *
 * @param {function} app - The express app.
 */
const routes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
  });
  app.get('/list', (req, res) => {
    if (!auth.currentUser) return res.redirect('/');
    res.sendFile(path.resolve(__dirname, './views/list.html'));
  });
  app.get('/item/:itemId', (req, res) => {
    if (!auth.currentUser) return res.redirect('/');
    res.sendFile(path.resolve(__dirname, './views/item.html'));
  });

  app.get('/set/:itemId', controllerGetSetItem);
  app.get('/api/list', controllerGetItems);
  app.post('/api/login', controllerPostLogin);
  app.get('/api/item/:itemId', controllerGetItemDetail);
};

export { routes, };
