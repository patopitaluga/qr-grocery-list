import { db, } from '../db.js';
import { onValue, ref, } from "firebase/database";
import { getAuth, } from 'firebase/auth';
const auth = getAuth();

/**
 *
 * @param {object} req - The http request object provided by the express server.
 * @param {object} res - The http response object provided by the express server.
 */
const controllerGetItemDetail = async(req, res) => {
  if (!auth.currentUser) return res.status(401).send({
    valid: false,
  });

  onValue(ref(db, '/items/' + auth.currentUser.uid + '/' + req.params.itemId), (snapshot) => {
    const item = snapshot.val();
    res.send(item);
  }, {
    onlyOnce: true,
  });
};

export { controllerGetItemDetail, };
