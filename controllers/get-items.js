import { db, } from '../db.js';
import { onValue, ref, } from "firebase/database";
import { getAuth, } from 'firebase/auth';
const auth = getAuth();

/**
 *
 * @param {object} req - The http request object provided by the express server.
 * @param {object} res - The http response object provided by the express server.
 */
const controllerGetItems = async(req, res) => {
  if (!auth.currentUser) return res.status(401).send({
    valid: false,
  });
;

  onValue(ref(db, '/items/' + auth.currentUser.uid), (snapshot) => {
    const items = snapshot.val();
    res.send(
      Object.keys(items).map(_eachItemId => {
        return {
          id: _eachItemId,
          title: items[_eachItemId].title,
          description: items[_eachItemId].description,
        }
      })
    );
  }, {
    onlyOnce: true,
  });
};

export { controllerGetItems, };
